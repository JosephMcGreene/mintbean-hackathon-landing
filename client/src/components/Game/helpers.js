const DIRECTIONS = {
  ArrowLeft: { row: 0, col: -1 },
  ArrowRight: { row: 0, col: 1, colStart: 3 },
  ArrowDown: { row: 1, col: 0, rowStart: 3 },
  ArrowUp: { row: -1, col: 0 },
};
const isInBorders = (i) => {
  return i >= 0 && i < 4;
};
const isTilesSame = (oldTiles, newTiles) => {
  let isSame = true;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (oldTiles[i][j] !== newTiles[i][j]) {
        isSame = false;
        break;
      }
    }
  }
  return isSame;
};
const getTilesCopy = (oldTiles) => {
  let newTiles = [];
  for (let i = 0; i < 4; i++) {
    newTiles[i] = [...oldTiles[i]];
  }
  return newTiles;
};
const getMovedTiles = (oldTiles, direction) => {
  let newTiles = getTilesCopy(oldTiles);
  for (
    let i = DIRECTIONS[direction].rowStart || 0;
    isInBorders(i);
    DIRECTIONS[direction].rowStart ? i-- : i++
  ) {
    for (
      let j = DIRECTIONS[direction].colStart || 0;
      isInBorders(j);
      DIRECTIONS[direction].colStart ? j-- : j++
    ) {
      moveTile(newTiles, i, j, direction);
    }
  }
  if (!isMoreMovesLeft(newTiles)) console.log("Game Over");
  if (!isTilesSame(oldTiles, newTiles)) spawnRandomCell(newTiles);

  return newTiles;
};
const isMoreMovesLeft = (tiles) => {
  if (getEmptyTilesCount(tiles) !== 0) return true;
  else {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (isInBorders(j + 1) && tiles[i][j] === tiles[i][j + 1]) {
          console.log(tiles[i][j]);
          return true;
        }
        if (isInBorders(i + 1) && tiles[i][j] === tiles[i + 1][j]) return true;
      }
    }
    return false;
  }
};
const moveTile = (tiles, row, col, direction) => {
  if (tiles[row][col] === 0) return;

  let newRow = row + DIRECTIONS[direction].row,
    newCol = col + DIRECTIONS[direction].col;
  if (isInBorders(newRow) && isInBorders(newCol)) {
    if (tiles[newRow][newCol] === 0) {
      tiles[newRow][newCol] = tiles[row][col];
      tiles[row][col] = 0;
      moveTile(tiles, newRow, newCol, direction);
    } else if (tiles[newRow][newCol] === tiles[row][col]) {
      tiles[newRow][newCol] *= 2;
      tiles[row][col] = 0;
      if (tiles[newRow][newCol] === 2048) alert("You won");
    }
  }
};
const getEmptyTilesCount = (tiles) => {
  let count = 0;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (tiles[i][j] === 0) {
        count++;
      }
    }
  }
  return count;
};
const spawnRandomCell = (tiles) => {
  let value = getRandomInt(100) < 90 ? 2 : 4;
  let row = getRandomInt(4),
    col = getRandomInt(4);
  if (tiles[row][col] !== 0) {
    if (getEmptyTilesCount(tiles) !== 0) spawnRandomCell(tiles, value);
    else {
    }
  } else {
    tiles[row][col] = value;
  }
};

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};
const generateTiles = () => {
  let tiles = new Array(4);
  for (let i = 0; i < 4; i++) {
    tiles[i] = [0, 0, 0, 0];
  }
  spawnRandomCell(tiles);
  spawnRandomCell(tiles);
  spawnRandomCell(tiles);

  return tiles;
};
export { DIRECTIONS, generateTiles, spawnRandomCell, getMovedTiles };
