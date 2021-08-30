import React from "react";
import { useState } from "react";
import { useEffect } from "react/cjs/react.development";

import "../../game.styles.css";


const getTileClassName = (value) => {
  if (value <= 2) return 2;
  if (value <= 4) return 4;
  if (value <= 8) return 8;
  if (value <= 16) return 16;
  if (value <= 32) return 32;
  if (value <= 64) return 64;
  if (value <= 2048) return 2048;
  if (value <= 4096) return 4096;
};
const tileTransformKeyframe = (tile) => {
  let rowVector = tile.prevRow - tile.row,
    colVector = tile.prevCol - tile.col;
  let scale = tile.isNew() && `scale(0.5,0.5)`;

  let transform = `translateX(${125 * colVector}px) translateY(${
    125 * rowVector
  }px) ${scale}`;
  return transform;
};
const Tile = ({ tile }) => {
  const { value, row, col, prevCol, prevRow } = tile;
  const [currentTransform, setCurrentTransform] = useState({
    transform: tileTransformKeyframe(tile),
  });
  const [currentPosition, setCurrentPosition] = useState();
  useEffect(() => {
    setCurrentPosition({
      top: `${row * 125}px`,
      left: `${col * 125}px`,
    });
    let transformTimer = setTimeout(() => {
      setCurrentTransform({
        transform: "translate(0,0)",
        transition: "transform 0.2s",
      });
    }, 100);
    return () => {
      clearTimeout(transformTimer);
    };
  }, [row, col, prevRow, prevCol]);

  return (
    <div
      className={`${
        value ? `active-tile tile-${getTileClassName(value)}` : "empty-tile"
      } `}
      style={{ ...currentPosition, ...currentTransform }}
    >
      {value || ""}
    </div>
  );
};

export default Tile;
