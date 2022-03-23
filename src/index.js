import { BrowserRouter, Route } from "react-router-dom";
import ReactDOM from "react-dom";
import React, { useEffect, useState } from "react";
import {
  Activities,
  Home,
  Navbar,
  My_Routines,
  Routines,
  Login_Register,
} from "./Components/index";

const Main = () => {
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState("");

  return (
    <>
      <div id="navbar">
        <h1 id="main-header">Fitness Trackr</h1>
        <div id="links">
          <Navbar userData={userData} setUserData={setUserData} token={token} />
        </div>
      </div>
      <div id="main-section">
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/activities">
          <Activities />
        </Route>
        <Route path="/routines">
          <Routines />
        </Route>

        <Route path="/register">
          <Login_Register action="register" setToken={setToken} />
        </Route>
        <Route path="/login">
          <Login_Register action="login" setToken={setToken} />
        </Route>
        <Route path="/my-routines">
          <My_Routines />
        </Route>
      </div>
    </>
  );
};

const root = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <Main />
  </BrowserRouter>,
  root
);
