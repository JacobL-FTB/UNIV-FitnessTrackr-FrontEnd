import { useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const API_ROUTINES = "https://fitnesstrac-kr.herokuapp.com/api/routines";

const EditRoutine = ({
  routines,
  userData,
  name,
  setName,
  goal,
  setGoal,
  token,
  error,
  setError,
  fetchRoutines,
  activities,
}) => {
  const history = useHistory();
  const id = useParams();

  const [activity, setActivity] = useState("any");
  const [count, setCount] = useState("");
  const [duration, setDuration] = useState("");
  const routine = routines.filter((routine) => id.routineId == routine.id);
  console.log(routine.name);
  const [isPublic, setIsPublic] = useState(true);

  const createForm = () => {
    if (name === "") {
      setName(routine.name);
    }
    if (goal === "") {
      setGoal(routine.goal);
    }
  };

  useEffect(createForm, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response2 = await fetch(`${API_ROUTINES}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        post: {
          name,
          goal,
          isPublic,
        },
      }),
    });
    const info2 = await response2.json();
    console.log;
    if (info2.error) {
      return setError(info2.error.message);
    }
    fetchRoutines();
    history.push("/my-routines");
  };

  return (
    routine && (
      <div id="create-post" key={routine.id}>
        <h3>Edit Routine</h3>
        <form className="new-post" onSubmit={handleSubmit}>
          <input
            className="input-posts"
            type="text"
            value={name}
            placeholder={routine[0].name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></input>
          <input
            className="input-posts"
            type="text"
            value={goal}
            placeholder={routine[0].goal}
            onChange={(e) => {
              setGoal(e.target.value);
            }}
          ></input>

          {/* <fieldset>
            <label>Add Activity To Routine</label>
            <select
              value={activity}
              onChange={(event) => {
                setActivity(event.target.value);
              }}
            >
              <option value="any">Any</option>
              {activities.map((activity) => {
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
          ></input> */}
          <Link to={`/routines/${id.routineId}/activities`}>
            Add or Delete Activity
          </Link>
          <button type="submit">Update Routine</button>
        </form>

        <p>{error}</p>
      </div>
    )
  );
};

export default EditRoutine;
