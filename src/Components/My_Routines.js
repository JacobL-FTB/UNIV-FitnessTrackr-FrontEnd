import { Link } from "react-router-dom";
import { useState } from "react";

const API_ROUTINES = "https://fitnesstrac-kr.herokuapp.com/api/routines";
const API_ROUTINEACTIVITES =
  "https://fitnesstrac-kr.herokuapp.com/api/routine_activities";

const MyRoutines = ({
  error,
  setError,
  userData,
  routines,
  setRoutines,
  fetchRoutines,
  name,
  setName,
  goal,
  setGoal,
}) => {
  const myRoutinesArr = routines.filter(
    (routine) => routine.creatorName === userData.username
  );
  const lsToken = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${API_ROUTINES}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${lsToken}`,
      },
      body: JSON.stringify({
        name,
        goal,
        isPublic: true,
      }),
    });
    const info = await response.json();
    if (info.error) {
      return setError(info.error);
    }
    setName("");
    setGoal("");
    setError("");
    fetchRoutines();
  };

  const handleDelete = async (routineId) => {
    const filteredArray = routines.filter(
      (routine) => routine.id !== `${routineId}`
    );
    setRoutines(filteredArray);
    try {
      const response = await fetch(`${API_ROUTINES}/${routineId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${lsToken}`,
        },
      });
      const info = await response.json();
    } catch (error) {
      console.error(info.error);
    }
    fetchRoutines();
  };

  const handleActivityDelete = async (id) => {
    const response = await fetch(`${API_ROUTINEACTIVITES}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${lsToken}`,
      },
    });
    const info = await response.json();
    if (info.error) {
      return setError(info.error);
    }
    fetchRoutines();
  };

  return (
    <>
      {userData && (
        <div>
          <form className="CreateActivity" onSubmit={handleSubmit}>
            <h3 className="title">Create New Routine</h3>
            <input
              className="TextInput"
              type="text"
              required
              value={name}
              placeholder="Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></input>
            <input
              className="TextInput"
              type="text"
              required
              value={goal}
              placeholder="Goal"
              onChange={(e) => {
                setGoal(e.target.value);
              }}
            ></input>
            <button type="submit">Submit Routine</button>
          </form>
          <p>{error}</p>
        </div>
      )}

      <h1 id="my-routines-label">My Routines:</h1>
      <hr></hr>
      {myRoutinesArr.map((routine) => {
        return routine.isPublic ? (
          <div className="routines-results" key={routine.id}>
            <h3 className="routine">Routine Name: {routine.name}</h3>

            <p className="routine">Goal: {routine.goal}</p>
            <h4 className="routine">By: {routine.creatorName}</h4>

            <Link className="routine-link" to={`/routines/${routine.id}`}>
              Update Routine
            </Link>
            <Link
              className="routine-link"
              to={`/routines/${routine.id}/activities`}
            >
              Add Activity
            </Link>
            <button
              className="routine"
              value={routine.id}
              onClick={(e) => {
                const id = e.target.value;
                handleDelete(id);
              }}
            >
              Delete Routine
            </button>
            {routine.activities &&
              routine.activities.map((activity) => {
                return (
                  <div className="activities-results" key={activity.id}>
                    <h4 id="activity-label" className="activities">
                      Activity Name: {activity.name}
                    </h4>
                    <h5 className="activities">Count: {activity.count}</h5>
                    <h5 className="activities">
                      Duration: {activity.duration}
                    </h5>
                    <Link
                      className="routine-link"
                      to={`/routine_activites/${activity.routineActivityId}`}
                    >
                      Update Activity
                    </Link>
                    <button
                      className="activities"
                      value={activity.routineActivityId}
                      onClick={(e) => {
                        const routineActivityId = e.target.value;
                        handleActivityDelete(routineActivityId);
                      }}
                    >
                      Delete Activity
                    </button>
                  </div>
                );
              })}

            <hr></hr>
          </div>
        ) : (
          <h1>Hello</h1>
        );
      })}
    </>
  );
};

export default MyRoutines;
