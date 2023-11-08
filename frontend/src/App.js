// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
//import LoginFormPage from "./components/LoginFormPage";
//import SignupFormPage from "./components/SignupFormModal";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Spots from "./components/Spots";
import { BrowserRouter as Router } from 'react-router-dom';

function App() {

  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);


  return (
    <Router>
    <Navigation isLoaded={isLoaded} />
    {isLoaded && (
      <Switch>
        <Route path="/" exact component={Spots} />
      </Switch>
    )}
  </Router>
  );
}

export default App;
