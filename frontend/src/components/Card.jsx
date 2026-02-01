import ProgressBar from "./ProgressBar";

const Card = ({ title, score, color = "green" }) => {
    const colorClass = color === "green" ? "bg-green-400" : "bg-blue-400";

    return (
        <div className="bg-white p-4 shadow-md rounded-2xl text-center">
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className={`text-2xl font-bold text-${color}-500 mb-2`}>
                {score}%
            </p>
            <ProgressBar value={score} />
        </div>
    );
};

export default Card;
