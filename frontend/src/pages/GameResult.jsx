import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Card from "../components/Card";

const GameResult = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-green-100 flex items-center justify-center p-6">
            <Card>
                <div className="text-center">
                    {/* Stars */}
                    <div className="text-6xl mb-4">⭐ ⭐ ⭐</div>

                    {/* Message */}
                    <h2 className="text-3xl font-bold mb-2">
                        Great Job!
                    </h2>
                    <p className="text-lg text-gray-600 mb-6">
                        You’re getting better every day 🌱
                    </p>

                    {/* Simple Stats */}
                    <div className="mb-6">
                        <p>🎯 Accuracy: <b>75%</b></p>
                        <p>⏱ Time Taken: <b>2 mins</b></p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-4">
                        <Button
                            text="Play Another Game 🎮"
                            onClick={() => navigate("/games")}
                        />
                        <Button
                            text="Finish for Today 🌙"
                            onClick={() => navigate("/")}
                        />
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default GameResult;
