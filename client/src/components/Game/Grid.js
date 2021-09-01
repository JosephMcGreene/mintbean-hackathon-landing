import GameTile from "helpers/tile.helpers";
import { useEffect, useState } from "react";
import TileContainer from "./TileContainer";

const Grid = ({ tiles, onKeyDown }) => {
  const handleKeyPress = (event) => {
    onKeyDown && onKeyDown(event);
  };
  const [currentTiles, setCurrentTiles] = useState([]);
  useEffect(() => {
    if (tiles) {
      let tmp = tiles.map((tileRow, r) =>
        tileRow.map((tile, c) => {
          if (!tile) return null;
          else {
            let { row, col, value, prevRow, prevCol, isNewTile } = tile;
            return new GameTile(row, col, value, prevRow, prevCol, isNewTile);
          }
        })
      );
      setCurrentTiles(tmp);
    }
  }, [tiles]);
  return (
    <div className="game-field" onKeyDown={handleKeyPress} tabIndex={-1}>
      {currentTiles.map((tileRow, r) =>
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
export default Grid;
