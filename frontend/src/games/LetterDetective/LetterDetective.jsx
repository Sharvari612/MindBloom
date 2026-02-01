import { useState } from "react";
import Button from "../../components/Button";
import ProgressBar from "../../components/ProgressBar";

const letterData = ["b", "d", "p", "q", "b", "d"];

const LetterDetective = () => {
    const [score, setScore] = useState(0);
    const [selectedLetters, setSelectedLetters] = useState([]);

    const handleClick = (letter) => {
        if (selectedLetters.includes(letter)) return;
        setSelectedLetters([...selectedLetters, letter]);
        if (letter === "b") setScore(score + 1);
        else setScore(score - 1 >= 0 ? score - 1 : 0);
    };

    return (
        <div className="min-h-screen bg-yellow-50 p-6">
            <h1 className="text-3xl font-bold mb-4">🔎 Letter Detective</h1>
            <p className="mb-2 font-medium">Score: {score}</p>
            <ProgressBar value={(score / letterData.length) * 100} />

            <div className="grid grid-cols-3 gap-4 mt-6">
                {letterData.map((letter, idx) => (
                    <div
                        key={idx}
                        onClick={() => handleClick(letter)}
                        className={`bg-white rounded-2xl shadow-md p-6 text-center text-3xl cursor-pointer hover:bg-green-100 ${selectedLetters.includes(letter) ? "bg-green-200" : ""
                            }`}
                    >
                        {letter}
                    </div>
                ))}
            </div>

            <div className="text-center mt-6">
                <Button text="Finish Game" onClick={() => alert("Go to Result")} />
            </div>
        </div>
    );
};

export default LetterDetective;
