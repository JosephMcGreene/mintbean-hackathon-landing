import { usePlayer } from "context/PlayerContext";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import GameServices from "services/game.services";
import shortid from "shortid";
const GameList = () => {
  const [list, setList] = useState({});
  const history = useHistory();
  const { state } = usePlayer();
  const { socket, isAuth } = state;
  const handleNewGame = () => {
    let gameId = shortid.generate();
    socket.emit("new-game", gameId);
  };
  const handleJoin = (gameId) => () => {
    if (isAuth) {
      history.push(`/game/${gameId}`);
    }
  };
  useEffect(() => {
    let onNewGame = (games) => {
      setList(games);
    };
    if (isAuth) {
      GameServices.fetchGameList().then(({ data }) => setList(data));
      socket.on("new-game-created", onNewGame);
    }
    return () => {
      socket?.off("new-game-created", onNewGame);
    };
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.isAuth]);
  return (
    <div>
      <button className="game-button" onClick={handleNewGame}>
        New game{" "}
      </button>
      <ul>
        <li className="list-item">
          <h4 className="list-header">Game ID</h4>
        </li>
        {Object.keys(list).map((gameId) => (
          <li key={gameId} className="list-item">
            <h4 >{gameId}</h4>
            <button className="list-item-button" onClick={handleJoin(gameId)}>
              Join
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default GameList;
