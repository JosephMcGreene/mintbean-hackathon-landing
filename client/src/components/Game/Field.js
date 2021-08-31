import "../../game.styles.css";
import { useEffect, useState } from "react";
import { DIRECTIONS } from "helpers/field.helper";

import TileContainer from "./TileContainer";

const Field = ({ setScore, gameFieldRef }) => {
  const [triggerRender, setTriggerRender] = useState(0);
  const [tiles, setTiles] = useState([]);

  const handleKeyPress = (event) => {
    if (DIRECTIONS[event.key]) {
      gameFieldRef.current.move(event.key);
      if (gameFieldRef.current.isTilesChanged())
        gameFieldRef.current.newRandomTile();
      if (gameFieldRef.current.isWon()) {
        alert("Congrats");
      }
      if (!gameFieldRef.current.isMovesLeft()) {
        alert("Lost");
      }
      setScore(gameFieldRef.current.score);
      setTriggerRender((prev) => prev + 1);
    }
  };

  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) setTiles(gameFieldRef.current.tiles);
    return () => {
      isCancelled = true;
    };
  }, [triggerRender, gameFieldRef]);

  return (
    <div className="game-field" onKeyDown={handleKeyPress} tabIndex={-1}>
      {tiles.map((tileRow, r) =>
        tileRow.map((tile, c) => (
          <TileContainer
            key={`row-${r} col-${c}`}
            row={r}
            col={c}
            tile={tile}
          />
        ))
      )}
    </div>
  );
};
export default Field;
