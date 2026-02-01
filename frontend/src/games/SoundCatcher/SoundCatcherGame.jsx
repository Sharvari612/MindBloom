import { useState, useEffect } from "react";
import Button from "../../components/Button";
import ProgressBar from "../../components/ProgressBar";

const soundCatcherData = [
    { word: "Shoe", phoneme: "sh" },
    { word: "Cat", phoneme: "sh" },
    { word: "Fish", phoneme: "sh" },
    { word: "Ship", phoneme: "sh" },
    { word: "Dog", phoneme: "sh" },
    { word: "Shell", phoneme: "sh" },
];

const SoundCatcher = () => {
    const [score, setScore] = useState(0);
    const [selectedWords, setSelectedWords] = useState([]);
    const [words, setWords] = useState([]);

    useEffect(() => {
        setWords(soundCatcherData.sort(() => Math.random() - 0.5));
    }, []);

    const speakWord = (text) => {
        if ("speechSynthesis" in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.8;
            window.speechSynthesis.speak(utterance);
        }
    };

    const handleClick = (word) => {
        if (selectedWords.includes(word.word)) return;
        setSelectedWords([...selectedWords, word.word]);
        if (word.phoneme === "sh") setScore(score + 1);
        else setScore(score - 1 >= 0 ? score - 1 : 0);
        speakWord(word.word);
    };

    return (
        <div className="min-h-screen bg-blue-50 p-6">
            <h1 className="text-3xl font-bold mb-4">🎮 Sound Catcher</h1>
            <p className="mb-2 font-medium">Score: {score}</p>
            <ProgressBar value={(score / words.length) * 100} />

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                {words.map((word) => (
                    <div
                        key={word.word}
                        onClick={() => handleClick(word)}
                        className={`bg-white rounded-2xl shadow-md p-6 text-center text-2xl cursor-pointer hover:bg-green-100 ${selectedWords.includes(word.word) ? "bg-green-200" : ""
                            }`}
                    >
                        {word.word}
                    </div>
                ))}
            </div>

            <div className="text-center mt-6">
                <Button text="Finish Game" onClick={() => alert("Go to Result")} />
            </div>
        </div>
    );
};

export default SoundCatcher;
