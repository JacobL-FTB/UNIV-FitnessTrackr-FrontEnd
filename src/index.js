import { BrowserRouter, Route } from "react-router-dom";
import ReactDOM from "react-dom";
import React, { useState, useEffect } from "react";
import {
  Activities,
  Home,
  Navbar,
  My_Routines,
  Routines,
  Login_Register,
  CreateRoutine,
  AddActivity,
  EditRoutine,
} from "./Components/index";

const API_USER = "http://fitnesstrac-kr.herokuapp.com/api/users/me";

const Main = () => {
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState("");
  const [routines, setRoutines] = useState([]);
  const [error, setError] = useState("");
  const [routineData, setRoutineData] = useState({});
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");

  const fetchUser = async () => {
    const lsToken = localStorage.getItem("token");
    if (lsToken) {
      setToken(lsToken);
    }
    try {
      const response = await fetch(`${API_USER}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${lsToken}`,
        },
      });
      const info = await response.json();
      setUserData(info);
      setUsername(info.username);
    } catch (error) {
      throw error;
    }
  };
  // console.log(userData);

  async function fetchRoutines() {
    const response = await fetch(
      "http://fitnesstrac-kr.herokuapp.com/api/routines"
    );
    setRoutines(await response.json());
  }

  useEffect(() => {
    fetchUser();
    fetchRoutines();
  }, [token]);

  return (
    <>
      <div id="navbar">
        <h1 id="main-header">Fitness Trackr</h1>
        <div id="links">
          <Navbar
            userData={userData}
            setUserData={setUserData}
            token={token}
            setToken={setToken}
          />
        </div>
      </div>
      <div id="main-section">
        <Route exact path="/">
          <Home userData={userData} />
        </Route>
        <Route exact path="/activities">
          <Activities />
        </Route>
        <Route path="/routines">
          <Routines
            userData={userData}
            routines={routines}
            setRoutines={setRoutines}
            setRoutineData={setRoutineData}
          />
        </Route>
        <Route path="/Create-Routine">
          <CreateRoutine userData={userData} />
        </Route>
        <Route path="/Add-Activity">
          <AddActivity />
        </Route>
        <Route path="/Edit-Routine">
          <EditRoutine />
        </Route>
        <Route path="/register">
          <Login_Register
            token={token}
            action="register"
            setToken={setToken}
            error={error}
            setError={setError}
            setUserData={setUserData}
          />
        </Route>
        <Route path="/login">
          <Login_Register
            action="login"
            setToken={setToken}
            error={error}
            setError={setError}
            setUserData={setUserData}
          />
        </Route>
        <Route path="/my-routines">
          <My_Routines
            token={token}
            setError={setError}
            error={error}
            userData={userData}
            routines={routines}
            setRoutines={setRoutines}
            fetchRoutines={fetchRoutines}
            username={username}
            name={name}
            goal={goal}
            setName={setName}
            setGoal={setGoal}
          />
        </Route>
        <Route path="/routines/:routineId">
          <EditRoutine
            routines={routines}
            name={name}
            goal={goal}
            setName={setName}
            setGoal={setGoal}
            token={token}
            error={error}
            setError={setError}
            fetchRoutines={fetchRoutines}
          />
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
