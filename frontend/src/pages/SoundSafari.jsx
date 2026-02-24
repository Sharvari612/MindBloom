import { useState, useEffect } from "react";
import { supabase } from "../services/supabaseClient";

export default function SoundSafari({ onComplete, childId }) {
  /* ─────────────── STATE ─────────────── */
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [gameResults, setGameResults] = useState([]);
  const [isLoadingML, setIsLoadingML] = useState(false);
  const [childData, setChildData] = useState(null);

  /* ─────────────── CHILD FETCH ─────────────── */
  useEffect(() => {
    const effectiveChildId =
      childId || localStorage.getItem("current_child_id");

    console.log("🔍 childId sources:", {
      prop: childId,
      localStorage: localStorage.getItem("current_child_id"),
      effective: effectiveChildId,
    });

    if (!effectiveChildId) {
      console.warn("⏳ Waiting for childId...");
      return;
    }

    const fetchChildData = async () => {
      try {
        console.log("📥 Fetching child:", effectiveChildId);

        const { data, error } = await supabase
          .from("children")
          .select("id, parent_id, name, age, gender, language")
          .eq("id", effectiveChildId)
          .single();

        if (error) {
          console.error("❌ Supabase error:", error);
          return;
        }

        console.log("✅ CHILD LOADED:", data);
        setChildData(data);
      } catch (err) {
        console.error("❌ Fetch exception:", err);
      }
    };

    fetchChildData();
  }, [childId]);

  /* ─────────────── GAME DATA ─────────────── */
  const wordsData = [
    { word: "said", options: ["sed", "sad", "said", "sid"], level: "easy" },
    { word: "was", options: ["was", "waz", "wus", "vas"], level: "easy" },
    { word: "have", options: ["hav", "have", "haf", "hev"], level: "easy" },
    { word: "what", options: ["what", "wot", "wut", "hwat"], level: "moderate" },
    { word: "come", options: ["kum", "come", "com", "coom"], level: "moderate" },
    { word: "some", options: ["sum", "some", "som", "soum"], level: "moderate" },
    { word: "they", options: ["thay", "they", "thee", "thy"], level: "moderate" },
    { word: "people", options: ["peeple", "people", "peopl", "pepple"], level: "hard" },
    { word: "friend", options: ["frend", "friend", "freind", "frind"], level: "hard" },
    { word: "thought", options: ["thot", "thought", "thort", "thaut"], level: "hard" },
  ];

  const currentWord = wordsData[currentWordIndex];

  /* ─────────────── SPEECH ─────────────── */
  useEffect(() => {
    const utterance = new SpeechSynthesisUtterance(currentWord.word);
    utterance.rate = 0.8;
    utterance.pitch = 1.2;
    utterance.volume = 0.9;
    window.speechSynthesis.speak(utterance);
  }, [currentWord]);

  const playWordAgain = () => {
    const u = new SpeechSynthesisUtterance(currentWord.word);
    u.rate = 0.8;
    u.pitch = 1.2;
    window.speechSynthesis.speak(u);
  };

  /* ─────────────── GAME LOGIC ─────────────── */
  const handleOptionClick = (option) => {
    if (showFeedback) return;

    const correct = option === currentWord.word;
    setSelectedOption(option);
    setIsCorrect(correct);
    setShowFeedback(true);

    setGameResults((prev) => [
      ...prev,
      {
        word: currentWord.word,
        selected: option,
        correct,
        level: currentWord.level,
      },
    ]);
  };

  /* ─────────────── ML SUBMIT ─────────────── */
  const submitToMLService = async () => {
    if (!childData) {
      alert("Child data not loaded yet.");
      return;
    }

    setIsLoadingML(true);

    const mlData = {
      age: childData.age,
      gender:
        childData.gender === "male"
          ? 1
          : childData.gender === "female"
          ? 0
          : 2,
      english_native: childData.language === "english" ? 1 : 0,
      accuracy:
        gameResults.filter((r) => r.correct).length / gameResults.length || 0,
      total_words: gameResults.length,
      easy_correct: gameResults.filter((r) => r.level === "easy" && r.correct).length,
      moderate_correct: gameResults.filter((r) => r.level === "moderate" && r.correct).length,
      hard_correct: gameResults.filter((r) => r.level === "hard" && r.correct).length,
      avg_response_time: 1.5,
      words_per_minute: gameResults.length / 30,
      error_rate_phonological: gameResults.filter((r) => !r.correct).length,
      substitution_errors: gameResults.filter(
        (r) => !r.correct && r.selected[0] === r.word[0]
      ).length,
    };

    console.log("🤖 Sending ML data:", mlData);

    try {
      // ✅ Using relative URL — Vite proxy forwards to http://127.0.0.1:5000/predict
      const res = await fetch("/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mlData),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Server error ${res.status}: ${errText}`);
      }

      const result = await res.json();
      console.log("✅ ML RESULT:", result);

      alert(
        `🧠 Dyslexia Screening Result\n\nRisk: ${result.dyslexia_risk_percentage}%\nLevel: ${result.risk_level}\nConfidence: ${result.confidence}%`
      );
      onComplete?.();
    } catch (err) {
      console.error("💥 ML ERROR:", err);
      console.log("📦 Game data preserved:", gameResults);
      alert(`Failed to contact ML service: ${err.message}`);
    } finally {
      setIsLoadingML(false);
    }
  };

  const nextWord = () => {
    if (currentWordIndex < wordsData.length - 1) {
      setCurrentWordIndex((i) => i + 1);
      setSelectedOption(null);
      setIsCorrect(null);
      setShowFeedback(false);
    } else {
      submitToMLService();
    }
  };

  /* ─────────────── UI ─────────────── */
  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h2>🦁 Sound Safari</h2>

      <p>
        Child: <strong>{childData?.name || "Loading..."}</strong> | Age:{" "}
        {childData?.age || "..."}
      </p>

      <p>
        Word {currentWordIndex + 1} / {wordsData.length}
      </p>

      <button onClick={playWordAgain} style={{ marginBottom: 20 }}>
        🔊 Play Word Again
      </button>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {currentWord.options.map((o) => (
          <button
            key={o}
            onClick={() => handleOptionClick(o)}
            disabled={showFeedback}
          >
            {o}
          </button>
        ))}
      </div>

      {showFeedback && (
        <div style={{ marginTop: 20 }}>
          <p style={{ fontSize: 24 }}>
            {isCorrect ? "✅ Correct!" : "❌ Try again!"}
          </p>
          <button onClick={nextWord} disabled={isLoadingML}>
            {isLoadingML ? "Analyzing..." : "Next"}
          </button>
        </div>
      )}
    </div>
  );
}