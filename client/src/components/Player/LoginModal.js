import React, { useState } from "react";
import { useHistory } from "react-router";
import { fetchUser } from "helpers/context.helpers";
import { usePlayer } from "context/PlayerContext";
const LoginModal = ({ handleClose, showLogin }) => {
  const history = useHistory();

  const { state, dispatch } = usePlayer();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    fetchUser(formData)(dispatch);
    if (state.isAuth) history.push("/gamelist");
    handleClose();
  };

  const handleCreateUser = () => {
    history.push("/register");
  };
  const handleUsernameChange = (event) => {
    setFormData((prevData) => ({ ...prevData, username: event.target.value }));
  };
  const handlePasswordChange = (event) => {
    setFormData((prevData) => ({ ...prevData, password: event.target.value }));
  };

  if (!showLogin) {
    return null;
  }

  return (
    <div id="loginModal">
      {/* Form to Log in: */}
      <form className="modalContent" onSubmit={handleSubmit}>
        <h3>Login</h3>
        <div className="modal-inputs">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" onChange={handleUsernameChange} />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit" id="loginSubmit" className="game-button">
          Submit
        </button>
        <button type="submit" className="game-button" onClick={handleClose}>
          Cancel
        </button>
        <h2>Or</h2>
        <button
          type="button"
          id="newAccountBtn"
          className="game-button"
          onClick={handleCreateUser}
        >
          Create a New User
        </button>
      </form>
    </div>
  );
};

export default LoginModal;
