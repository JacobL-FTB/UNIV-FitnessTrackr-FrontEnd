import { BrowserRouter, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import {
  Activities,
  Home,
  Navbar,
  My_Routines,
  Routines,
  Login_Register,
} from './Components/index';

const Main = () => {
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState('');
  const [routines, setRoutines] = useState([]);
  const [error, setError] = useState('');

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
          <Routines
            userData={userData}
            routines={routines}
            setRoutines={setRoutines}
          />
        </Route>
        <Route path="/Create-Routine">
          <CreateRoutine />
        </Route>
        <Route path="/register">
          <Login_Register
            action="register"
            setToken={setToken}
            error={error}
            setError={setError}
          />
        </Route>
        <Route path="/login">
          <Login_Register
            action="login"
            setToken={setToken}
            error={error}
            setError={setError}
          />
        </Route>
        <Route path="/my-routines">
          <My_Routines />
        </Route>
      </div>
    </>
  );
};

const root = document.getElementById('root');
ReactDOM.render(
  <BrowserRouter>
    <Main />
  </BrowserRouter>,
  root
);
