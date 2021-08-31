import React, { useRef, useState } from "react";
import Header from "../Header";
import Field from "./Field";
import GameField from "../../helpers/field.helper";
import { useHistory } from "react-router";
const Game = () => {
  const [score, setScore] = useState(0);
  const history = useHistory();
  const gameFieldRef = useRef(new GameField());
  const handleStartButton = () => {
    gameFieldRef.current.buildField();
    setScore(0);
  };
  return (
    <div>
      <Header />
      <h3>Score: {score}</h3>
      <Field setScore={setScore} gameFieldRef={gameFieldRef} />
      <button onClick={handleStartButton} className="game-button">
        Restart Game
      </button>
    </div>
  );
};
export default Game;
