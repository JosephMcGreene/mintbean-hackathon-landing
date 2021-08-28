import React from "react";
import { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import "../../game.styles.css";
import { DIRECTIONS } from "./helpers";

const getTileMoveAnimation = (direction, emptyTilesCount) => {
  let animation = "";
  let marginCoef = emptyTilesCount ? 1 : 0;
  if (direction) {
    let x = DIRECTIONS[direction].col,
      y = DIRECTIONS[direction].row;
    animation = ` 
                  translate(${1 * x * marginCoef}rem, ${1 * y * marginCoef}rem)
                  translateX(${100 * x * emptyTilesCount}%)
                  translateY(${100 * y * emptyTilesCount}%)
                `;
  }
  return animation;
};
const Tile = ({ value, row, col, direction, emptyTilesCount }) => {
  const [currentAnimation, setCurrentAnimation] = useState("");
  const [currentValue, setCurrentValue] = useState(0);
  useEffect(() => {
    setCurrentAnimation(getTileMoveAnimation(direction, emptyTilesCount));
    setTimeout(() => {
      setCurrentAnimation("");
    }, 560);
    // setTimeout(() => setCurrentAnimation(""), 1000);
  }, [direction]);
  useEffect(() => {
    setTimeout(() => {
      setCurrentValue(value);
    }, 550);
  }, [value]);
  return (
    <div
      className={`${currentValue !== 0 ? "active-tile" : "empty-tile"} `}
      style={{
        transform: currentAnimation,
      }}
    >
      {currentValue || ""}
    </div>
  );
};

export default Tile;
