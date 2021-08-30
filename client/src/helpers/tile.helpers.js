function GameTile(row, col, value = 0) {
  this.row = row;
  this.col = col;
  this.value = value;
  this.prevRow = row;
  this.prevCol = col;
  this.isNewTile = true;
}
GameTile.prototype.setIsMerged = function (bool) {
  this.merged = bool;
};

GameTile.prototype.isNew = function () {
  return this.isNewTile;
};
GameTile.prototype.getCoords = function () {
  return {
    row: this.row,
    col: this.col,
  };
};
GameTile.prototype.saveCoords = function () {
  this.prevRow = this.row;
  this.prevCol = this.col;
};
GameTile.prototype.setPrevCoords = function ({ row, col }) {
  this.prevRow = row;
  this.prevCol = col;
};
GameTile.prototype.getPrevCoords = function () {
  return {
    row: this.prevRow,
    col: this.prevCol,
  };
};
GameTile.prototype.setCoords = function ({ row, col }) {
  this.isNewTile = false;
  this.row = row;
  this.col = col;
};
GameTile.prototype.setValue = function () {
  this.value *= 2;
};
GameTile.prototype.isCoordsChanged = function () {
  return this.row !== this.prevRow || this.col !== this.prevCol;
};
export default GameTile;
