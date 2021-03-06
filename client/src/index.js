import React from "react";
import ReactDOM from "react-dom";
import "./game.styles.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import PlayerProvider from "context/PlayerContext";
ReactDOM.render(
  <React.StrictMode>
    <PlayerProvider>
      <App />
    </PlayerProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
