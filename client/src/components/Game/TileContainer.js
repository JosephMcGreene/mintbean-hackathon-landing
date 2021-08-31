import React, { useEffect, useState } from "react";
import Tile from "./Tile";
const TileContainer = (props) => {
  const { row, col, tile } = props;
  const [currentTile, setCurrentTile] = useState(tile);
  const style = {
    top: `${row * 125}px`,
    left: `${col * 125}px`,
  };
  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled)
      if (tile === null) {
        setTimeout(() => {
          setCurrentTile(null);
        }, 50);
      } else {
        setCurrentTile(tile);
      }
    return () => {
      isCancelled = true;
    };
  }, [tile]);
  return (
    <div className="tile-container" style={style}>
      {currentTile !== null && <Tile tile={currentTile} />}
    </div>
  );
};
export default TileContainer;
