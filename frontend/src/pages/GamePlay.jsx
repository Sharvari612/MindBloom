import { useLocation, useNavigate } from "react-router-dom";
import GameWrapper from "./GameWrapper"; // common wrapper


// Import actual game components
import SoundCatcherGame from "../games/SoundCatcher/SoundCatcherGame";
import LetterDetective from "../games/LetterDetective/LetterDetective";
import WordBuilder from "../games/WordBuilder/WordBuilder";

// Map game IDs to components
const gameMap = {
  1: SoundCatcherGame,
  2: LetterDetective,
  3: WordBuilder,
};

const GamePlay = () => {
  const location = useLocation();
  const navigate = useNavigate();
 const gameId = location?.state?.gameId;

  // Handle invalid or missing game
  if (!gameId || !gameMap[gameId]) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-xl">
        Invalid game selection!
      </div>
    );
  }

  const GameComponent = gameMap[gameId];

  // Handle finish game callback
  const handleFinish = (score) => {
    navigate("/results", { state: { gameId, score } });
  };

  return (
    <GameWrapper gameId={gameId} onFinish={handleFinish}>
      {({ finishGame }) => <GameComponent finishGame={finishGame} />}
    </GameWrapper>
  );
};

export default GamePlay;
