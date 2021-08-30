import React, { useState } from "react";
import LoginModal from "./LoginModal";

const Header = () => {
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    // NEED ACTUAL STUFF HERE. JUST CLOSES THE MODAL RIGHT NOW

    setShowModal(false);
  };

  return (
    <header>
      <h1>
        2048<sup>2</sup>
      </h1>
      <button
        type="button"
        id="loginButton"
        className="game-button"
        onClick={() => setShowModal(true)}
      >
        Login
      </button>
      <LoginModal showModal={showModal} onSubmit={handleSubmit} />
    </header>
  );
};

export default Header;
