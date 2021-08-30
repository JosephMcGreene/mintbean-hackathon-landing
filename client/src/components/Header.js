import React, { useState } from "react";
import LoginModal from "./LoginModal";

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    // NEED ACTUAL STUFF HERE. JUST CLOSES THE MODAL RIGHT NOW

    setShowLogin(false);
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
        onClick={() => setShowLogin(true)}
      >
        Login
      </button>
      {/* display: none until user clicks #loginButton */}
      <LoginModal showLogin={showLogin} onSubmit={handleSubmit} />
    </header>
  );
};

export default Header;
