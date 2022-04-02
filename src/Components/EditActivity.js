import { useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

const API_ROUTINEACTIVITIES =
  "https://fitnesstrac-kr.herokuapp.com/api/routine_activities";

const EditActivity = ({ routines, error, setError, fetchRoutines }) => {
  const history = useHistory();
  const id = useParams();

  const [count, setCount] = useState("");
  const [duration, setDuration] = useState("");
  const lsToken = localStorage.getItem("token");

  const handleUpdate = async (id) => {
    if (count === "") {
      const response = await fetch(
        `${API_ROUTINEACTIVITIES}/${id.routineActivityId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${lsToken}`,
          },
          body: JSON.stringify({
            duration,
          }),
        }
      );
      const info = await response.json();

      if (info.error) {
        return setError(info.error);
      }
      setCount("");
      setDuration("");
      setError("");
      fetchRoutines();
      history.push("/my-routines");
    } else if (duration === "") {
      const response = await fetch(`${API_ROUTINEACTIVITIES}/${id}`, {
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
        return setError(info.error);
      }
      setCount("");
      setDuration("");
      setError("");
      fetchRoutines();
      history.push("/my-routines");
    } else {
      const response = await fetch(`${API_ROUTINEACTIVITIES}/${id}`, {
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
        return setError(info.error);
      }
      setCount("");
      setDuration("");
      fetchRoutines();
      setError("");
      history.push("/my-routines");
    }
  };

  const routineActivity = () => {
    for (let routine of routines) {
      for (let i = 0; i < routine.activities.length; i++) {
        if (routine.activities) {
          if (routine.activities[i].routineActivityId == id.routineActivityId) {
            return routine.activities[i];
          }
        }
      }
    }
  };

  const activity = routineActivity();

  const createForm = () => {
    if (count === "") {
      setCount(activity.count);
    }
    if (duration === "") {
      setDuration(activity.duration);
    }
  };

  useEffect(createForm, []);

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
        type="submit"
        value={activity.routineActivityId}
        onClick={(e) => {
          const routineActivityId = e.target.value;
          handleUpdate(routineActivityId);
        }}
      >
        Update Count and Duration
      </button>
      <p className="activities">{error}</p>
    </div>
  );
};

export default EditActivity;
