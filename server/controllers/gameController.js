const { games } = require("../config/socket.config");

module.exports = {
  getGameList: function (req, res) {
    res.json(games);
  },
  getGame: function (req, res) {
    let { gameId } = req.params;
    if (games[gameId]) res.json({ game: games[gameId] });
    else res.status(404).json({ msg: "not found" });
  },
};
