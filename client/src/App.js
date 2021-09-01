import React from "react";
import Game from "./components/Game/Game";
// import { BrowserRouter as Switch, Route, Link, useHistory, useLocation } from 'react-router-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginModal from "./components/Player/LoginModal";
import CreateUser from "./components/Player/CreateUser";
import GameList from "components/GameList/GameList";
import MPGame from "components/MPGame/MPGame";
import Home from "Pages/Home";
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/play" component={Game} exact />
        <Route path="/login" component={LoginModal} />
        <Route path="/register" component={CreateUser} />
        <Route path="/gamelist" component={GameList} />
        <Route path="/game/:gameId" component={MPGame} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
