import React, { useState } from "react";
import PlayerServices from "services/player.services";

const CreateUser = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const handleEmailChange = (event) => {
    setFormData((prevData) => ({ ...prevData, email: event.target.value }));
  };
  const handleUsernameChange = (event) => {
    setFormData((prevData) => ({ ...prevData, username: event.target.value }));
  };
  const handlePasswordChange = (event) => {
    setFormData((prevData) => ({ ...prevData, password: event.target.value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    PlayerServices.register(formData);
  };
  return (
    <div id="createUserModal" onSubmit={handleSubmit}>
      <form className="modalContent">
        <h3>Create a New User</h3>
        <div className="modal-inputs">
          <label htmlFor="email">
            Email:
            <input type="text" id="email" onChange={handleEmailChange} />
          </label>
          <label htmlFor="username">
            Username:
            <input type="text" id="username" onChange={handleUsernameChange} />
          </label>
          <label htmlFor="password">
            Password:
            <input
              type="password"
              id="password"
              onChange={handlePasswordChange}
            />
          </label>
        </div>
        <button type="submit" className="game-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
