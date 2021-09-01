const games = {};
exports.socketConfig = (io) => {
  io.on("connection", (client) => {
    client.playerID = client.handshake.query?.playerID;
    client.playerName = client.handshake.query?.playerName;
    client.on("new-game", (gameId) => {
      games[gameId] = {
        gameStarted: false,
        players: [
          {
            playerID: client.playerID,
            playerName: client.playerName,
            score: 0,
            tiles: [],
          },
        ],
      };
      io.emit("new-game-created", games);
    });
    client.on("player-join", ({ gameId, user, tiles }) => {
      if (games[gameId]?.players.length < 2) {
        io.to(`${gameId}`).emit("player-joined", { user, tiles });
        client.join(`${gameId}`);
      }
    });
    client.on("tiles-change", ({ gameId, user, tiles, score }) => {
      client.broadcast
        .to(`${gameId}`)
        .emit("other-tiles", { user, tiles, score });
    });
    client.on("winner", ({ gameId, user }) => {
      io.to(`${gameId}`).emit("new-win", { user });
    });
  });
};
exports.games = games;
