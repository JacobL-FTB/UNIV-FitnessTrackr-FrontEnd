import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useParams } from "react-router-dom";

import Routines from "./Routines";

const API_ROUTINES = "https://fitnesstrac-kr.herokuapp.com/api/routines";
const API_ROUTINEACTIVITES =
  '"https://fitnesstrac-kr.herokuapp.com/api/routine_activities";';

const AddActivity = ({ activities, setError, fetchRoutines, routines }) => {
  const [count, setCount] = useState("");
  const [duration, setDuration] = useState("");
  const history = useHistory();
  const id = useParams();
  console.log(id.routineId);
  console.log(routines);
  const routine = routines.filter((routine) => id.routineId == routine.id);
  console.log(routine);
  // const filteredArray = activities.filter(
  //   (activity) => activity.name === activity
  // );
  // console.log(filteredArray);

  const [activity, setActivity] = useState("any");
  const [activityId, setActivityId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(activityId);
    console.log(count, duration);
    console.log(activity);

    const response = await fetch(`${API_ROUTINES}/${id.routineId}/activities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        activityId,
        count,
        duration,
      }),
    });
    const info = await response.json();
    console.log(info);
    if (info.error) {
      return setError(info.error.message);
    }
    fetchRoutines();
    history.push("/my-routines");
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const response = await fetch(`${API_ROUTINEACTIVITES}/${activityId}`);
  };

  return (
    <>
      <form className="new-post" onSubmit={handleSubmit}>
        <fieldset>
          <label>Add Activity To Routine</label>
          <select
            value={activity}
            onChange={(event) => {
              setActivity(event.target.value);
              const filteredArray = activities.filter(
                (activity) => activity.name === event.target.value
              );
              setActivityId(filteredArray[0].id);

              console.log(filteredArray[0].id);
            }}
          >
            <option value="any">Any</option>
            {activities.map((activity) => {
              // console.log(activity.id);
              return (
                <>
                  <option key={activity.id} value={activity.name}>
                    {activity.name}
                  </option>
                </>
              );
            })}
          </select>
          {/* <select
          value={activityId}
          onChange={(event) => {
            setActivityId(event.target.value);
            console.log(event.target.value);
          }}
        >
          {activities.map((activity) => {
            return (
              <>
                <option key={activity.id} value={activity.id}></option>
              </>
            );
          })}
        </select> */}
        </fieldset>
        <input
          className="input-posts"
          type="text"
          value={count}
          placeholder="Count"
          onChange={(e) => {
            setCount(e.target.value);
          }}
        ></input>
        <input
          className="input-posts"
          type="text"
          value={duration}
          placeholder="Duration"
          onChange={(e) => {
            setDuration(e.target.value);
          }}
        ></input>

        <button type="submit">Update Routine</button>
      </form>
      <h1>Remove Activity From Routine</h1>
      <div>
        {routine.activities &&
          routine.activities.map((activity) => {
            return (
              <div key={activity.id}>
                <h4>Activity: {activity.name}</h4>
                <h4>Count:{activity.count}</h4>
                <h4>Duration:{activity.duration}</h4>
                <h4>id {activity.id}</h4>
                <button onClick={handleClick} type="submit">
                  Delete Activity
                </button>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default AddActivity;
