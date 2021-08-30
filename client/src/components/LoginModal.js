import React, { useState } from "react";
import CreateUser from "./CreateUser";

const LoginModal = ({ showLogin, onSubmit }) => {
  const [showCreateUser, setShowCreateUser] = useState(false);

  if (!showLogin) {
    return null;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    // NEED ACTUAL STUFF HERE. JUST CLOSES THE MODAL RIGHT NOW

    setShowCreateUser(false);
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
          onClick={() => setShowCreateUser(true)}
        >
          Create a New User
        </button>
      </form>
      <CreateUser showCreateUser={showCreateUser} onSubmit={handleSubmit} />
    </div>
  );
};

export default LoginModal;
