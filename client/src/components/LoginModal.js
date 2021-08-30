import React from "react";

const LoginModal = ({ showModal, onSubmit, onClick }) => {
  if (!showModal) {
    return null;
  }

  return (
    <div id="loginModal">
      <form action="" id="modalContent">
        <h3>Login</h3>
        <div className="login-inputs">
          <label htmlFor="username">
            Username:
            <input type="text" id="username" />
          </label>
          <label htmlFor="password">
            Password:
            <input type="text" id="password" />
          </label>
        </div>
        <button
          type="submit"
          id="loginSubmit"
          className="game-button"
          onClick={onSubmit}
        >
          Submit
        </button>
        Or
        <button
          type="button"
          id="newAccountBtn"
          className="game-button"
          onClick={onClick}
        >
          Create a New Login
        </button>
      </form>
    </div>
  );
};

export default LoginModal;
