import { useRef, useState } from "react";
import Field from "./Field";
import GameField from "../../helpers/field.helper";
import { useHistory } from "react-router";
const Game = () => {
  const [score, setScore] = useState(0);
  const history = useHistory();
  const gameFieldRef = useRef(new GameField());
  const handleLoginButton = () => {
    history.push("/login");
  };
  const handleStartButton = () => {
    gameFieldRef.current.buildField();
    setScore(0);
  };
  return (
    <div>
      <h3>Score: {score}</h3>
      <Field setScore={setScore} gameFieldRef={gameFieldRef} />
      <button onClick={handleStartButton}>Restart Game</button>
      <button onClick={handleLoginButton}>Login</button>
    </div>
  );
};
export default Game;
