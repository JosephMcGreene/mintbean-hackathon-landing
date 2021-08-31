import { getRandomInt } from "./game.helpers";
import GameTile from "./tile.helpers";

const DIRECTIONS = {
  ArrowLeft: { row: 0, col: -1 },
  ArrowRight: { row: 0, col: 1, colStart: 3 },
  ArrowDown: { row: 1, col: 0, rowStart: 3 },
  ArrowUp: { row: -1, col: 0 },
};

function Field(size = 4) {
  this.size = size;
  this.tiles = [];
  this.score = 0;
  this.won = false;
  this.buildField();
}
Field.prototype.isWon = function () {
  return this.won;
};
Field.prototype.buildField = function () {
  this.score = 0;
  for (let i = 0; i < this.size; i++) {
    this.tiles[i] = [];
    for (let j = 0; j < this.size; j++) {
      this.tiles[i][j] = null;
    }
  }
  this.newRandomTile();
  this.newRandomTile();
};
Field.prototype.isTilesChanged = function () {
  let tilesChanged = false;
  this.eachTile((r, c, tile) => {
    if (tile && tile.isCoordsChanged()) tilesChanged = true;
  });
  return tilesChanged;
};
Field.prototype.eachTile = function (callback) {
  for (let i = 0; i < this.size; i++) {
    for (let j = 0; j < this.size; j++) {
      callback(i, j, this.tiles[i][j]);
    }
  }
};
Field.prototype.isInBorders = function (coords) {
  return (
    coords.row >= 0 &&
    coords.row < this.size &&
    coords.col >= 0 &&
    coords.col < this.size
  );
};
Field.prototype.move = function (direction) {
  let traversal = this.getTraversal(direction);

  traversal.rows.forEach((row) => {
    traversal.cols.forEach((col) => {
      if (this.tiles[row][col] !== null) {
        this.moveTile(this.tiles[row][col], direction);
      }
    });
  });
};
Field.prototype.isTileAvailable = function (coords) {
  return this.getTile(coords) === null;
};
Field.prototype.setTile = function ({ row, col }, tile) {
  this.removeTile(tile.getPrevCoords());
  this.tiles[row][col] = tile;
};
Field.prototype.removeTile = function ({ row, col }) {
  this.tiles[row][col] = null;
};
Field.prototype.getTile = function ({ row, col }) {
  return this.tiles[row][col] || null;
};
Field.prototype.moveTile = function (tile, direction) {
  tile.saveCoords();

  let currCoords = {
    row: tile.row + DIRECTIONS[direction].row,
    col: tile.col + DIRECTIONS[direction].col,
  };
  while (this.isInBorders(currCoords) && this.isTileAvailable(currCoords)) {
    currCoords.row += DIRECTIONS[direction].row;
    currCoords.col += DIRECTIONS[direction].col;
  }
  if (this.getTile(currCoords).value === tile.value) {
    tile.setValue();
    this.score += tile.value;
    if (tile.value === 2048) this.won = true;
    tile.setCoords(currCoords);
    this.setTile(currCoords, tile);
  } else {
    currCoords.row -= DIRECTIONS[direction].row;
    currCoords.col -= DIRECTIONS[direction].col;
    tile.setCoords(currCoords);
    this.setTile(currCoords, tile);
  }
};
Field.prototype.getTraversal = function (direction) {
  let traversals = { rows: [], cols: [] };
  for (let i = 0; i < this.size; i++) {
    traversals.rows.push(i);
    traversals.cols.push(i);
  }
  if (DIRECTIONS[direction].row === 1) traversals.rows.reverse();
  if (DIRECTIONS[direction].col === 1) traversals.cols.reverse();

  return traversals;
};
Field.prototype.newRandomTile = function () {
  let availableTiles = this.getAvailableTiles();
  if (availableTiles.length > 0) {
    let randomIdx = getRandomInt(availableTiles.length);
    let tileCoords = availableTiles[randomIdx];
    let row = tileCoords.row,
      col = tileCoords.col;
    let value = getRandomInt(100) < 90 ? 2 : 4;
    this.tiles[row][col] = new GameTile(row, col, value);
  }
};
Field.prototype.isMovesLeft = function () {
  if (this.getAvailableTiles().length > 0) return true;
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (
        this.isInBorders({ row: r, col: c + 1 }) &&
        this.tiles[r][c].value === this.tiles[r][c + 1].value
      )
        return true;
      if (
        this.isInBorders({ row: r + 1, col: c }) &&
        this.tiles[r][c].value === this.tiles[r + 1][c].value
      )
        return true;
    }
  }
  return false;
};
Field.prototype.getAvailableTiles = function () {
  let availableTiles = [];
  this.eachTile((row, col, tile) => {
    if (tile === null) availableTiles.push({ row, col });
  });
  return availableTiles;
};
Field.prototype.isTilesAvailable = function () {
  return this.getAvailableTiles().length > 0;
};

export { DIRECTIONS };
export default Field;
