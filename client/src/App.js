import "./App.css";
import Game from "./components/Game/Game";
import Login from "./components/Player/Login";
import Home from "./Pages/Home";
// import { BrowserRouter as Switch, Route, Link, useHistory, useLocation } from 'react-router-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/singleplayer" component={Game} />
        <Route path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
