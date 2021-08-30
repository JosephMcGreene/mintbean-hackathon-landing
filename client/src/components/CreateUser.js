import React from "react";

const CreateUser = ({ showCreateUser, onSubmit }) => {
  if (!showCreateUser) {
    return null;
  }

  return (
    <div id="createUserModal">
      <form action="" id="" className="modalContent">
        <h3>Create a New User</h3>
        <div className="modal-inputs">
          <label htmlFor="username">
            Username:
            <input type="text" id="username" />
          </label>
          <label htmlFor="password">
            Password:
            <input type="text" id="password" />
          </label>
        </div>
        <button type="submit" className="game-button" onSubmit={onSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
