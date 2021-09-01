import React, { useRef, useState } from "react";
import Header from "../Header";
import Field from "./Field";
import GameField from "../../helpers/field.helper";
import { usePlayer } from "context/PlayerContext";
const Game = () => {
  const [score, setScore] = useState(0);
  const gameFieldRef = useRef(new GameField());
  const { state } = usePlayer();
  const handleStartButton = () => {
    gameFieldRef.current.buildField();
    setScore(0);
  };
  return (
    <div>
      <Header />
      <h3>
        {state.user?.playerName} Score: {score}
      </h3>
      <Field setScore={setScore} gameFieldRef={gameFieldRef} />
      <button onClick={handleStartButton} className="game-button">
        Restart Game
      </button>
    </div>
  );
};
export default Game;
