import React from "react";
import Game from "./components/Game/Game";
import Login from "./components/Player/Login";
import Home from "./Pages/Home";
// import { BrowserRouter as Switch, Route, Link, useHistory, useLocation } from 'react-router-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginModal from "./components/Player/LoginModal";
import CreateUser from "./components/Player/CreateUser";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Game} exact />
        <Route path="/login" component={LoginModal} />
        <Route path="/register" component={CreateUser} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
