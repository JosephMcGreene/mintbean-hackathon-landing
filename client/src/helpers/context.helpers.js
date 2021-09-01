import PlayerServices from "services/player.services";

export const fetchUser = (userData) => (dispatch) => {
  PlayerServices.login(userData)
    .then(({ data }) => {
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: data,
      });
    })
    .catch(() => {
      dispatch({
        type: "LOGIN_FAIL",
      });
    });
};
