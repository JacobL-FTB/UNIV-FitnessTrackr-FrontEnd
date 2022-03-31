<<<<<<< HEAD
import { Link } from 'react-router-dom';

const API_ROUTINES = 'https://fitnesstrac-kr.herokuapp.com/api/routines';
=======
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const API_ROUTINES = "https://fitnesstrac-kr.herokuapp.com/api/routines";
const API_ROUTINEACTIVITES =
  "https://fitnesstrac-kr.herokuapp.com/api/routine_activities";
>>>>>>> d83ef5508a71e3534df17370dfd659d88ca78113

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
  setToken,
  setUserData,
}) => {
  const [count, setCount] = useState("");
  const [duration, setDuration] = useState("");
  const myRoutinesArr = routines.filter(
    (routine) => routine.creatorName === userData.username
  );
  console.log(myRoutinesArr);
  console.log(userData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${API_ROUTINES}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        goal,
        isPublic: true,
      }),
    });
    const info = await response.json();
    console.log(info);
    if (info.error) {
      return setError(info.error);
    }
<<<<<<< HEAD
    fetchRoutines();
    setName('');
    setGoal('');
  };

  const lsToken = localStorage.getItem('token');
  // console.log(routines);
  // console.log(userData);

  let myRoutinesArr = [];
  if (userData) {
    myRoutinesArr = routines.filter((routine) => {
      if (routine.creatorId === userData.id) return true;
    });
  }
=======
    setName("");
    setGoal("");
    fetchRoutines();
  };

  const lsToken = localStorage.getItem("token");
>>>>>>> d83ef5508a71e3534df17370dfd659d88ca78113

  const handleDelete = async (routineId) => {
    const filteredArray = routines.filter(
      (routine) => routine.id !== `${routineId}`
    );
    setRoutines(filteredArray);
    try {
      const response = await fetch(`${API_ROUTINES}/${routineId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${lsToken}`,
        },
      });
      const info = await response.json();
      console.log(info);
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
    console.log(info);
    if (info.error) {
      return setError(info.error.message);
    }
    fetchRoutines();
  };

  const handleUpdate = async (id) => {
    const response = await fetch(`${API_ROUTINEACTIVITES}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        count,
        duration,
      }),
    });
    const info = await response.json();
    console.log(info);
    if (info.error) {
      return setError(info.error.message);
    }
    setCount("");
    setDuration("");
    fetchRoutines();
  };

  return (
    <>
<<<<<<< HEAD
      <div>
        {userData ? <h2>Create New Routine</h2> : <></>}
        <form className="new-post" onSubmit={handleSubmit}>
          <input
            className="input-posts"
=======
      {userData ? <h2 id="new-routine-heading">Create New Routine</h2> : <></>}
      <div id="new-routine">
        <form onSubmit={handleSubmit}>
          <input
            className="input-create-routine"
>>>>>>> d83ef5508a71e3534df17370dfd659d88ca78113
            type="text"
            required
            value={name}
            placeholder="Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></input>
          <input
<<<<<<< HEAD
            className="input-posts"
=======
            className="input-create-routine"
>>>>>>> d83ef5508a71e3534df17370dfd659d88ca78113
            type="text"
            required
            value={goal}
            placeholder="Goal"
            onChange={(e) => {
              setGoal(e.target.value);
            }}
          ></input>
<<<<<<< HEAD
          <button type="submit">Submit Routine</button>
        </form>
        <p>{error}</p>
        <h3 id="post-label" className="my-info">
          My Routines:
        </h3>
        <section className="my-messages">
          {myRoutinesArr.map((routine) => {
            return routine.isPublic ? (
              <div className="routineView" key={routine.id}>
                <Link className="post-links" to={`/routines/${routine.id}`}>
                  <h3 className="post-title">{routine.name}</h3>
                </Link>
                <p className="post-info">{routine.goal}</p>
                <h4 className="post-info">By: {routine.creatorName}</h4>
                {routine.activities &&
                  routine.activities.map((activity) => {
                    return (
                      <div key={activity.id}>
                        <h4>Activity: {activity.name}</h4>
                        <h4>Count:{activity.count}</h4>
                        <h4>Duration:{activity.duration}</h4>
                      </div>
                    );
                  })}
                <button
                  value={routine.id}
                  onClick={(e) => {
                    const id = e.target.value;
                    handleDelete(id);
                  }}
                >
                  Delete
                </button>
                <Link className="button" to={`/routines/${routine.id}/Edit`}>
                  <button>Edit Routine</button>
                </Link>
                <hr></hr>
              </div>
            ) : (
              <h1>Hello</h1>
            );
          })}
        </section>
        <Link
          className="button"
          to="/"
          hidden={userData ? false : true}
          onClick={() => {
            setToken('');
            localStorage.removeItem('token');
            setUserData(null);
          }}
        >
          Logout
        </Link>
      </div>
=======
          <button className="input-create-routine" type="submit">
            Submit Routine
          </button>
        </form>
        <p>{error}</p>
      </div>
      <hr></hr>
      <h2 id="my-routines-label">My Routines:</h2>

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
                    <h4 className="activities">
                      Activity Name: {activity.name}
                    </h4>
                    <label className="activities">Count</label>
                    <input
                      className="activities"
                      onChange={(e) => {
                        setCount(e.target.value);
                      }}
                      placeholder={activity.count}
                      value={count}
                    ></input>
                    <label className="activities">Duration</label>
                    <input
                      className="activities"
                      onChange={(e) => {
                        setDuration(e.target.value);
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
                        handleUpdate(routineActivityId);
                      }}
                    >
                      Update Count and Duration
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
>>>>>>> d83ef5508a71e3534df17370dfd659d88ca78113
    </>
  );
};

export default MyRoutines;
