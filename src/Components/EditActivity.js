import { useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { useEffect } from "react";

const API_ROUTINEACTIVITIES =
  "https://fitnesstrac-kr.herokuapp.com/api/routine_activities";

const EditActivity = ({
  routines,
  userData,
  token,
  error,
  setError,
  fetchRoutines,
}) => {
  const history = useHistory();
  const id = useParams();

  const [count, setCount] = useState("");
  const [duration, setDuration] = useState("");
  console.log(routines);

  const myRoutinesArr = routines.filter(
    (routine) => routine.creatorName === userData.username
  );

  console.log(activity);
  const [isPublic, setIsPublic] = useState(true);

  const createForm = () => {
    if (count === "") {
      setCount(routineActivity.count);
    }
    if (duration === "") {
      setDuration(routineActivity.duration);
    }
  };

  useEffect(createForm, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `${API_ROUTINEACTIVITIES}/${id.routineActivityId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          count,
          duration,
        }),
      }
    );
    const info = await response.json();
    console.log(info);
    if (info.error) {
      return setError(info.error.message);
    }
    fetchRoutines();
    history.push("/my-routines");
  };

  return (
    routineActivity && (
      <div id="create-post" key={routineActivity.id}>
        <h3>Edit Routine</h3>
        <form className="new-post" onSubmit={handleSubmit}>
          <input
            className="input-posts"
            type="text"
            value={count}
            placeholder={routineActivity.count}
            onChange={(e) => {
              setCount(e.target.value);
            }}
          ></input>
          <input
            className="input-posts"
            type="text"
            value={duration}
            placeholder={routineActivity.duration}
            onChange={(e) => {
              setDuration(e.target.value);
            }}
          ></input>
          <button type="submit">Update Routine</button>
        </form>

        <p>{error}</p>
      </div>
    )
  );
};

export default EditActivity;
