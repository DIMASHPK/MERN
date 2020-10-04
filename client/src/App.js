import React from "react";
import { useRoutes } from "./routes";
import { BrowserRouter as Router } from "react-router-dom";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import { NavBar } from "./components/Navbar";
import { Loader } from "./components/Loader";
import "materialize-css";

function App() {
  const { token, login, logout, userId, ready } = useAuth();
  const isAthenticated = !!token;
  const routes = useRoutes(isAthenticated);

  if (!ready) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider
      value={{ token, login, logout, userId, isAthenticated }}
    >
      <Router>
        {isAthenticated && <NavBar />}
        <div className="container">{routes}</div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
