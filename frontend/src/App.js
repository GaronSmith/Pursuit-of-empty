import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import ProjectsTiles from "./components/ProjectTiles"
import { Switch, Route } from "react-router-dom";
import WorkSpace from "./components/WorkSpace";
import HomePage from "./components/Index";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
    <>
      <Navigation isLoaded={isLoaded} />

      <Switch>
          <Route exact path='/'>
            <HomePage />
          </Route>
          <Route path='/dashboard'>
            <ProjectsTiles isLoaded={isLoaded} />
          </Route>
          <Route path='/workspace/:id'>
            <WorkSpace />
          </Route>
          <Route>
            404 page not found 
          </Route>
      </Switch>
      
    </>
  );
}

export default App;