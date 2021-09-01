import { usePlayer } from "context/PlayerContext";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import LoginModal from "./Player/LoginModal";

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const { state } = usePlayer();
  const { isAuth } = state;
  const history = useHistory();
  const handleClose = () => {
    setShowLogin(false);
  };

  return (
    <header>
      <h1>
        2048<sup>2</sup>
      </h1>
      {isAuth ? (
        <button
          type="button"
          className="game-button"
          onClick={() => history.push("/gamelist")}
        >
          Game List
        </button>
      ) : (
        <button
          type="button"
          id="loginButton"
          className="game-button"
          showLogin={false}
          onClick={() => setShowLogin(true)}
        >
          Login
        </button>
      )}
      {/* display: none until user clicks #loginButton */}
      <LoginModal showLogin={showLogin} handleClose={handleClose} />
    </header>
  );
};

export default Header;
