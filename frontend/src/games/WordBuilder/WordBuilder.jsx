import { useState } from "react";
import Button from "../../components/Button";
import ProgressBar from "../../components/ProgressBar";

const targetWord = "CAT";
const letters = ["C", "A", "T", "B", "D"];

const WordBuilder = () => {
    const [score, setScore] = useState(0);
    const [selected, setSelected] = useState([]);

    const handleClick = (letter) => {
        if (selected.length >= targetWord.length) return;
        setSelected([...selected, letter]);
        if (letter === targetWord[selected.length]) setScore(score + 1);
        else setScore(score - 1 >= 0 ? score - 1 : 0);
    };

    return (
        <div className="min-h-screen bg-pink-50 p-6">
            <h1 className="text-3xl font-bold mb-4">🧩 Word Builder</h1>
            <p className="mb-2 font-medium">Score: {score}</p>
            <ProgressBar value={(score / targetWord.length) * 100} />

            <div className="grid grid-cols-3 gap-4 mt-6">
                {letters.map((letter, idx) => (
                    <div
                        key={idx}
                        onClick={() => handleClick(letter)}
                        className={`bg-white rounded-2xl shadow-md p-6 text-center text-3xl cursor-pointer hover:bg-green-100 ${selected.includes(letter) ? "bg-green-200" : ""
                            }`}
                    >
                        {letter}
                    </div>
                ))}
            </div>

            <div className="mt-6">
                <p>
                    Selected: {selected.join("")}
                </p>
            </div>

            <div className="text-center mt-6">
                <Button text="Finish Game" onClick={() => alert("Go to Result")} />
            </div>
        </div>
    );
};

export default WordBuilder;
