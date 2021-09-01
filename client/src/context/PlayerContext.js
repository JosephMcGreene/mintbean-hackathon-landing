import { createContext, useContext, useEffect, useReducer } from "react";
import PlayerServices from "services/player.services";
import { io } from "socket.io-client";

const PlayerContext = createContext();

const playerReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS": {
      return {
        isAuth: true,
        user: action.payload,
        socket: io({
          query: {
            playerID: action.payload.id,
            playerName: action.payload.playerName,
          },
        }),
      };
    }
    case "LOGIN_FAIL": {
      return { isAuth: false, user: {} };
    }
    default: {
      return state;
    }
  }
};
const PlayerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(playerReducer, { user: {} });
  useEffect(() => {
    PlayerServices.authenticate()
      .then(({ data }) => {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: data,
        });
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <PlayerContext.Provider value={{ state, dispatch }}>
      {children}
    </PlayerContext.Provider>
  );
};
export const usePlayer = () => {
  return useContext(PlayerContext);
};
export default PlayerProvider;
