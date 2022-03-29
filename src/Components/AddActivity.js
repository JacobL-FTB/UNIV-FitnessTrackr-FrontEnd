import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { unstable_renderSubtreeIntoContainer } from "react-dom/cjs/react-dom.development";

const API_ROUTINES = "https://fitnesstrac-kr.herokuapp.com/api/routines";

const AddActivity = ({ activities, setError }) => {
  const [count, setCount] = useState("");
  const [duration, setDuration] = useState("");
  const history = useHistory();
  const id = useParams();
  console.log(id);

  const [activity, setActivity] = useState("any");
  const [activityId, setActivityId] = useState("");
  console.log(activity);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(activityId);
    console.log(count, duration);
    console.log(activity);
    console.log(activity.id);

    const response = await fetch(`${API_ROUTINES}/${id.routineId}/activities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        post: {
          activityId: activityId,
          count,
          duration,
        },
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

  return (
    <form className="new-post" onSubmit={handleSubmit}>
      <fieldset>
        <label>Add Activity To Routine</label>
        <select
          value={activity}
          onChange={(event) => {
            setActivity(event.target.value);
            setActivityId(event.target.id);
          }}
        >
          <option value="any">Any</option>
          {activities.map((activity) => {
            console.log(activity);
            return (
              <>
                <option key={activity.id} value={activity.name}>
                  {activity.name}
                </option>
              </>
            );
          })}
        </select>
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
  );
};

export default AddActivity;
