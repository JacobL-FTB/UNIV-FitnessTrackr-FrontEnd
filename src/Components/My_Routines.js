import { Link } from "react-router-dom";
import { useState } from "react";

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
  username,
  name,
  setName,
  goal,
  setGoal,
}) => {
  // const [routineActivityId, setRoutineActivityId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${API_ROUTINES}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
    fetchRoutines();
    setName("");
    setGoal("");
  };

  const lsToken = localStorage.getItem("token");
  // console.log(routines);
  console.log(userData);

  const myRoutinesArr = routines.filter(
    (routine) => routine.creatorName === userData.username
  );
  console.log(myRoutinesArr);

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
      console.log(info);
    } catch (error) {
      console.error(error);
    }
    fetchRoutines();
  };

  const handleActivityDelete = async (id) => {
    // const routineActivities = myRoutinesArr.map((routine) => {
    //   routine.activities.filter((routineActivity) => {
    //     routineActivity.id !== `${id}`;
    //   });
    // });

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

  return (
    <>
      {userData ? <h2>Create New Routine</h2> : <></>}
      <form className="new-post" onSubmit={handleSubmit}>
        <input
          className="input-posts"
          type="text"
          required
          value={name}
          placeholder="Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></input>
        <input
          className="input-posts"
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
      <h3 id="post-label" className="my-info">
        My Routines:
      </h3>
      <section className="my-messages">
        {myRoutinesArr.map((routine) => {
          return routine.isPublic ? (
            <div className="post-results" key={routine.id}>
              <Link className="post-links" to={`/routines/${routine.id}`}>
                <h3 className="post-title">{routine.name}</h3>
              </Link>
              <p className="post-info">{routine.goal}</p>
              <h4 className="post-info">By: {routine.creatorName}</h4>
              <button
                value={routine.id}
                onClick={(e) => {
                  const id = e.target.value;
                  handleDelete(id);
                }}
              >
                Delete Routine
              </button>
              <Link className="button" to={`/routines/${routine.id}`}>
                <button>Edit Routine</button>
              </Link>
              <Link to={`/routines/${routine.id}/activities`}>
                Add Activity
              </Link>
              {routine.activities &&
                routine.activities.map((activity) => {
                  console.log(activity);
                  return (
                    <div key={activity.id}>
                      <h4>Activity: {activity.name}</h4>
                      <h4>Count:{activity.count}</h4>
                      <h4>Duration:{activity.duration}</h4>
                      <button
                        value={activity.routineActivityId}
                        onClick={(e) => {
                          const routineActivityId = e.target.value;
                          handleActivityDelete(routineActivityId);
                        }}
                      >
                        Delete Activity
                      </button>
                      <button>Update Activity</button>
                    </div>
                  );
                })}

              <hr></hr>
            </div>
          ) : (
            <h1>Hello</h1>
          );
        })}
      </section>
    </>
  );
};

export default MyRoutines;
