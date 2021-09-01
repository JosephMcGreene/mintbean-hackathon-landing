import Axios from "axios";
const login = (playerData) => {
  return Axios.post("/api/player/login", playerData);
};
const register = (playerData) => {
  return Axios.post("/api/player", playerData);
};
const authenticate = () => {
  return Axios.post("/api/player/authenticate");
};
export default { login, register, authenticate };
