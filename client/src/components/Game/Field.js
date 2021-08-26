import Tile from "./Tile";
import "./game.styles.css";
import { useEffect, useRef, useState } from "react";
import { DIRECTIONS, generateTiles, getMovedTiles } from "./helpers";

const Field = () => {
  const [tiles, setTiles] = useState([]);
  const handleKeyPress = (event) => {
    if (DIRECTIONS[event.key]) {
      setTiles((prevTiles) => getMovedTiles(prevTiles, event.key));
    }
  };

  useEffect(() => {
    setTiles(generateTiles());
  }, []);

  return (
    <div className="game-field" onKeyDown={handleKeyPress} tabIndex={-1}>
      {tiles.map((tileRow, r) =>
        tileRow.map((value, c) => (
          <Tile key={`row-${r} col-${c}`} value={value} />
        ))
      )}
    </div>
  );
};
export default Field;
