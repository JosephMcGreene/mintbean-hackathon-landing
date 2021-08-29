import React from "react";
import "./App.css";
import Field from "./components/Game/Field";
import Login from "./components/Player/Login";
import Home from "./Pages/Home";

// import { BrowserRouter as Switch, Route, Link, useHistory, useLocation } from 'react-router-dom';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <Switch>
      <Route path='/' component={Home} exact />
      <Route path="/singleplayer" component={Field} />
      <Route path="/login" component={Login} />
      
    </Switch>
      
    </BrowserRouter>
    
  );
}

export default App;
