import { useRef, useState } from "react";
import Field from "./Field";
import GameField from "../../helpers/field.helper";
const Game = () => {
  const [score, setScore] = useState(0);

  const gameFieldRef = useRef(new GameField());
  const handleStartButton = () => {
    gameFieldRef.current.buildField();
    setScore(0);
  };
  return (
    <div>
      <h3>Score: {score}</h3>
      <Field setScore={setScore} gameFieldRef={gameFieldRef} />
      <button onClick={handleStartButton}>Restart Game</button>
    </div>
  );
};
export default Game;
