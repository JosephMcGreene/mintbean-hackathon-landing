import React, { useEffect, useRef, useState } from "react";
import Field from "components/Game/Field";
import GameField from "../../helpers/field.helper";
import { useHistory, useParams } from "react-router";
import { usePlayer } from "context/PlayerContext";
import Grid from "components/Game/Grid";
import GameServices from "services/game.services";
const MPGame = (props) => {
  const { gameId } = useParams();
  const { state } = usePlayer();
  const { socket, isAuth, user } = state;
  const history = useHistory();
  const gameFieldRef = useRef(new GameField());
  const [score, setScore] = useState(0);
  const [otherUser, setOtherUser] = useState({});
  const [otherTiles, setOtherTiles] = useState([]);
  const [otherScore, setOtherScore] = useState(0);
  const handleStartButton = () => {
    gameFieldRef.current.buildField();
    setScore(0);
  };
  const handleOnMove = () => {
    socket.emit("tiles-change", {
      gameId,
      user,
      tiles: gameFieldRef.current.tiles,
      score: gameFieldRef.current.score,
    });
  };
  const handleOnWin = () => {
    socket.emit("winner", { gameId, user });
  };
  useEffect(() => {
    if (isAuth) {
      GameServices.fetchGame(gameId)
        .then(({ data }) => {
          const { game } = data;
          const { players } = game;
          let otherPlayer = players.find(
            (player) => player.playerID !== user.id
          );
          if (otherPlayer) {
            setOtherTiles(otherPlayer.tiles);
            setOtherScore(otherPlayer.score);
            setOtherUser({
              id: otherPlayer.playerID,
              name: otherPlayer.playerName,
            });
          }
          socket.emit("player-join", {
            gameId,
            user,
            tiles: gameFieldRef.current.tiles,
          });
          socket.on("new-win", ({ user }) => {
            alert(user.playerName + " won");
          });
        })
        .catch((err) => {
          history.push("/gamelist");
        });
      socket.on("other-tiles", ({ tiles, score, user }) => {
        setOtherTiles(tiles);
        setOtherScore(score);
        setOtherUser(user);
      });
    }
    return () => {
      socket?.off("otherTiles");
    };
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div>
          <h3>
            {state.user?.playerName} Score: {score}
          </h3>
          <Field
            setScore={setScore}
            gameFieldRef={gameFieldRef}
            onMove={handleOnMove}
            onWin={handleOnWin}
          />
        </div>
        <div>
          <h3>
            {otherUser?.playerName} Score: {otherScore}
          </h3>
          <Grid tiles={otherTiles} />
        </div>
      </div>
      <button onClick={handleStartButton} className="game-button">
        Restart Game
      </button>
    </div>
  );
};
export default MPGame;
