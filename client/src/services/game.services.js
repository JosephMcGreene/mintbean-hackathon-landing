import Axios from "axios";
const fetchGameList = () => {
  return Axios.get("/api/games");
};
const fetchGame = (gameId) => {
  return Axios.get(`/api/games/${gameId}`);
};
const GameServices = { fetchGameList, fetchGame };
export default GameServices;
