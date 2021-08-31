import React, { useState } from "react";
import { useHistory } from "react-router";
import CreateUser from "./CreateUser";

const LoginModal = ({ onSubmit }) => {
  const history = useHistory();
  const handleSubmit = (event) => {
    event.preventDefault();

    // NEED ACTUAL STUFF HERE. JUST CLOSES THE MODAL RIGHT NOW
  };
  const handleCreateUser = () => {
    history.push("/register");
  };
  return (
    <div id="loginModal">
      {/* Form to Log in: */}
      <form action="" className="modalContent">
        <h3>Login</h3>
        <div className="modal-inputs">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" />
          <label htmlFor="password">Password:</label>
          <input type="text" id="password" />
        </div>
        <button
          type="submit"
          id="loginSubmit"
          className="game-button"
          onClick={onSubmit}
        >
          Submit
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
