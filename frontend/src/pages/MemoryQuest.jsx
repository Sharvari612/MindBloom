import { useState, useEffect } from "react";
import "../styles/MemoryQuest.css";

export default function MemoryQuest({
  difficulty = {
    pairs: 2,          // adaptive parameter
    previewTime: 2000, // ms
    penalty: "none",   // none | shake | reset
  },
  onComplete,
}) {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [isPreview, setIsPreview] = useState(true);
  const [lockBoard, setLockBoard] = useState(false);

  /* ─── SETUP CARDS ───────────────────── */
  useEffect(() => {
    const baseIcons = ["🐶", "🐱", "🐼", "🦊", "🐸", "🐵"];
    const selected = baseIcons.slice(0, difficulty.pairs);

    const deck = [...selected, ...selected]
      .map((icon, index) => ({
        id: index,
        icon,
      }))
      .sort(() => Math.random() - 0.5);

    setCards(deck);

    // Preview phase
    setTimeout(() => {
      setIsPreview(false);
    }, difficulty.previewTime);
  }, [difficulty]);

  /* ─── CARD CLICK ───────────────────── */
  const handleFlip = (index) => {
    if (lockBoard || isPreview) return;
    if (flipped.includes(index) || matched.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      checkMatch(newFlipped);
    }
  };

  /* ─── MATCH LOGIC ───────────────────── */
  const checkMatch = ([first, second]) => {
    setLockBoard(true);

    if (cards[first].icon === cards[second].icon) {
      setMatched((prev) => [...prev, first, second]);
      resetTurn();

      // 🎉 Level completed
      if (matched.length + 2 === cards.length) {
        setTimeout(onComplete, 800);
      }
    } else {
      setTimeout(() => {
        if (difficulty.penalty === "reset") {
          setMatched([]);
        }
        resetTurn();
      }, 800);
    }
  };

  const resetTurn = () => {
    setFlipped([]);
    setLockBoard(false);
  };

  /* ─── RENDER ───────────────────────── */
  return (
    <div className="memory-quest">
      <h2>🃏 Memory Quest</h2>
      <p>
        {isPreview
          ? "Look carefully and remember the cards!"
          : "Tap two cards to find a match"}
      </p>

      <div
        className="card-grid"
        style={{
          gridTemplateColumns: `repeat(${difficulty.pairs}, 1fr)`,
        }}
      >
        {cards.map((card, index) => {
          const isVisible =
            isPreview ||
            flipped.includes(index) ||
            matched.includes(index);

          return (
            <button
              key={index}
              className={`memory-card ${
                matched.includes(index) ? "matched" : ""
              }`}
              onClick={() => handleFlip(index)}
            >
              <span className="card-face">
                {isVisible ? card.icon : "❓"}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}