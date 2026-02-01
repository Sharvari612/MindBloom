import { useNavigate } from "react-router-dom";

const GameWrapper = ({ children, gameId, onFinish }) => {
  const navigate = useNavigate();

  const handleFinish = (score) => {
    if (onFinish) onFinish(score);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 p-6">
      <h1 className="text-3xl font-bold mb-6">🎮 Game #{gameId}</h1>
      <div className="w-full max-w-2xl bg-white p-6 rounded-xl shadow-lg">
        {children({ finishGame: handleFinish })}
      </div>
    </div>
  );
};

export default GameWrapper;
