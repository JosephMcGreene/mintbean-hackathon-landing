import React from "react";
import "../../game.styles.css";

const Tile = ({ value }) => {
  return (
    <div className={value !== 0 ? "active-tile" : "game-tile"}>
      {value || ""}
    </div>
  );
};

export default Tile;
