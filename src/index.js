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
  AddActivity,
  EditRoutine,
  EditActivity,
} from "./Components/index";

const API_USER = "http://fitnesstrac-kr.herokuapp.com/api/users/me";
const BASE_URL = "https://fitnesstrac-kr.herokuapp.com/api";

const Main = () => {
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState("");
  const [routines, setRoutines] = useState([]);
  const [error, setError] = useState("");
  const [routineData, setRoutineData] = useState({});
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [activities, setActivities] = useState([]);
  const [activitiesRoutines, setActivitiesRoutines] = useState([]);

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

      // setUsername(info.data.username);
    } catch (error) {
      throw error;
    }
  };
  // console.log(userData);

  async function fetchRoutines() {
    const response = await fetch(
      "http://fitnesstrac-kr.herokuapp.com/api/routines"
    );
    const info = await response.json();
    console.log(info);
    setRoutines(info);
  }

  const fetchActivities = async () => {
    const resp = await fetch(`${BASE_URL}/activities`);
    const info = await resp.json();
    // console.log(info);
    if (resp.error) {
      throw new Error(resp.error);
    }
    setActivities(info);
  };

  useEffect(() => {
    fetchUser();
    fetchRoutines();
    fetchActivities();
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
          <Activities
            activities={activities}
            setActivities={setActivities}
            fetchActivities={fetchActivities}
            userData={userData}
            setError={setError}
            error={error}
          />
        </Route>
        {/* <Route exact path="/activities/:activityId">
          <Activities
            activities={activities}
            setActivities={setActivities}
            fetchActivities={fetchActivities}
            userData={userData}
            fetchUser={fetchUser}
          />
        </Route> */}
        <Route exact path="/activities/routineId">
          <Activities
activitiesRoutines={activitiesRoutines}
setActivitiesRoutines={setActivitiesRoutines}
            userData={userData}
            setError={setError}
            error={error}
          />
        </Route>
        <Route exact path="/routines">
          <Routines
            userData={userData}
            routines={routines}
            setRoutines={setRoutines}
            setRoutineData={setRoutineData}
          />
        </Route>

        <Route exact path="/routines/:routineId/activities">
          <AddActivity
            activities={activities}
            setActivities={setActivities}
            token={token}
            setError={setError}
            fetchRoutines={fetchRoutines}
            routines={routines}
          />
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
        <Route exact path="/routines/:routineId">
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
            activities={activities}
            setActivities={setActivities}
            setRoutines={setRoutines}
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
