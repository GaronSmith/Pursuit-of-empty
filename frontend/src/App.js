import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import DashboardSecondNav from "./components/DashboardSecondNav";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
    <>
      <Navigation isLoaded={isLoaded} />
      <DashboardSecondNav />
    </>
  );
}

export default App;