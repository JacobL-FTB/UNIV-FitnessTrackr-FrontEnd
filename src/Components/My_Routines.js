import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const API_ROUTINES = "https://fitnesstrac-kr.herokuapp.com/api/routines";
const API_ROUTINEACTIVITES =
  "https://fitnesstrac-kr.herokuapp.com/api/routine_activities";

const MyRoutines = ({
  error,
  setError,
  token,
  userData,
  routines,
  setRoutines,
  fetchRoutines,
  name,
  setName,
  goal,
  setGoal,
  username,
}) => {
  const [count, setCount] = useState("");
  const [duration, setDuration] = useState("");
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
      console.error(error);
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
      return setError(info.error.message);
    }
    fetchRoutines();
  };

  const handleUpdate = async (id) => {
    if (count === "") {
      const response = await fetch(`${API_ROUTINEACTIVITES}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${lsToken}`,
        },
        body: JSON.stringify({
          duration,
        }),
      });
      const info = await response.json();

      if (info.error) {
        return setError(info.error.message);
      }
      setCount("");
      setDuration("");
      fetchRoutines();
    } else if (duration === "") {
      const response = await fetch(`${API_ROUTINEACTIVITES}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${lsToken}`,
        },
        body: JSON.stringify({
          count,
        }),
      });
      const info = await response.json();

      if (info.error) {
        return setError(info.error.message);
      }
      setCount("");
      setDuration("");
      fetchRoutines();
    } else {
      const response = await fetch(`${API_ROUTINEACTIVITES}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${lsToken}`,
        },
        body: JSON.stringify({
          count,
          duration,
        }),
      });
      const info = await response.json();

      if (info.error) {
        return setError(info.error.message);
      }
      setCount("");
      setDuration("");
      fetchRoutines();
    }
  };

  return (
    <>
      {userData ? <h2 id="new-routine-heading">Create New Routine</h2> : <></>}
      <div id="new-routine">
        <form onSubmit={handleSubmit}>
          <input
            className="input-create-routine"
            type="text"
            required
            value={name}
            placeholder="Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></input>
          <input
            className="input-create-routine"
            type="text"
            required
            value={goal}
            placeholder="Goal"
            onChange={(e) => {
              setGoal(e.target.value);
            }}
          ></input>
          <button className="input-create-routine" type="submit">
            Submit Routine
          </button>
        </form>
        <p>{error}</p>
      </div>

      <h2 id="my-routines-label">My Routines:</h2>
      <hr></hr>
      {myRoutinesArr.map((routine) => {
        return routine.isPublic ? (
          <div className="routines-results" key={routine.id}>
            <h3 className="routine">Routine Name: {routine.name}</h3>

            <p className="routine">Goal: {routine.goal}</p>
            <h4 className="routine">By: {routine.creatorName}</h4>
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
            <Link className="routine-link" to={`/routines/${routine.id}`}>
              Update Routine
            </Link>
            <Link
              className="routine-link"
              to={`/routines/${routine.id}/activities`}
            >
              Add Activity
            </Link>
            {routine.activities &&
              routine.activities.map((activity) => {
                return (
                  <div className="activities-results" key={activity.id}>
                    <h4 id="activity-label" className="activities">
                      Activity Name: {activity.name}
                    </h4>
                    <label className="activities">Count</label>
                    <input
                      className="activities"
                      onChange={(e) => {
                        setCount(Number(e.target.value));
                      }}
                      placeholder={activity.count}
                      value={count}
                    ></input>
                    <label className="activities">Duration</label>
                    <input
                      className="activities"
                      onChange={(e) => {
                        setDuration(Number(e.target.value));
                      }}
                      placeholder={activity.duration}
                      value={duration}
                    ></input>
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
                    <button
                      className="activities"
                      type="submit"
                      value={activity.routineActivityId}
                      onClick={(e) => {
                        const routineActivityId = e.target.value;
                        console.log(routineActivityId);
                        handleUpdate(routineActivityId);
                      }}
                    >
                      Update Count and Duration
                    </button>
                    {/* <Link
                      to={`/routine_activites/${activity.routineActivityId}`}
                    >
                      Update Activity
                    </Link> */}
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
