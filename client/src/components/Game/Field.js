import Tile from "./Tile";
import "../../game.styles.css";
import React, { useEffect, useRef, useState } from "react";
import {
  DIRECTIONS,
  generateTiles,
  getEmptyTilesInDirection,
  getMovedTiles,
} from "./helpers";
// import styled, { keyframes } from "styled-components";
// import {
//   fadeOutDown,
//   fadeOutLeft,
//   fadeOutRight,
//   fadeOutUp,
// } from "react-animations";

const Field = () => {
  const [tiles, setTiles] = useState([]);
  const [direction, setDirection] = useState();
  const handleKeyPress = (event) => {
    if (DIRECTIONS[event.key]) {
      setDirection(event.key);
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
          <div className="game-tile" key={`row-${r} col-${c}`}>
            <Tile
              row={r}
              col={c}
              value={value}
              direction={direction}
              emptyTilesCount={getEmptyTilesInDirection(tiles, r, c, direction)}
            />
          </div>
        ))
      )}
    </div>
  );
};
export default Field;
