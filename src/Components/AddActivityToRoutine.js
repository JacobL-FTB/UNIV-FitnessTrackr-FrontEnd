import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

const AddActivityToRoutine = (props) => {
  const history = useHistory();
  const { routineData } = props;
  const [activities, setActivities] = useState([]);

  const fetchActivities = async () => {
    const response = await fetch(
      `http://fitnesstrac-kr.herokuapp.com/api/activities`
    );
    const info = await response.json();
    if (response.error) {
      throw new Error(response.error);
    }
    setActivities(info);
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const addActivityToRoutine = async (routine) => {
    const response = await fetch(
      `http://fitnesstrac-kr.herokuapp.com/api/routines/${routine.id}/activities`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          activityId: activity,
          count: count,
          duration: duration,
        }),
      }
    );
    const data = await response.json();
    console.log(data);
  };

  const [activity, setActivity] = useState(Number);
  const [count, setCount] = useState(Number);
  const [duration, setDuration] = useState(Number);

  return (
    <form className="activityForm">
      <label>Choose activity to add.</label>
      <select
        value={activity}
        onChange={(event) => {
          setActivity(event.target.value);
        }}
      >
        <option></option>
        {activities.map((activity) => {
          return (
            <option value={activity.id} key={activity.id}>
              {activity.name}
            </option>
          );
        })}
      </select>
      <label>Count</label>
      <input
        type="text"
        value={count}
        onChange={(event) => setCount(event.target.value)}
      ></input>
      <label>Duration</label>
      <input
        type="text"
        value={duration}
        onChange={(event) => setDuration(event.target.value)}
      ></input>
      <button
        className="button"
        type="submit"
        onClick={(event) => {
          event.preventDefault(), addActivityToRoutine(routineData);
        }}
      >
        Submit
      </button>
    </form>
  );
};

export default AddActivityToRoutine;
