import { useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

const API_ROUTINES = "https://fitnesstrac-kr.herokuapp.com/api/routines";

const EditRoutine = ({
  routines,
  name,
  setName,
  goal,
  setGoal,
  token,
  error,
  setError,
  fetchRoutines,
}) => {
  const history = useHistory();
  const id = useParams();
  const [isPublic, setIsPublic] = useState(true);

  const routine = routines.filter((routine) => id.routineId == routine.id);

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
    const response = await fetch(`${API_ROUTINES}/${id.routineId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        goal,
        isPublic,
      }),
    });
    const info = await response.json();
    if (info.error) {
      return setError(info.error);
    }
    fetchRoutines();
    setError("");
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
          <button type="submit">Update Routine</button>
        </form>
        <p>{error}</p>
      </div>
    )
  );
};

export default EditRoutine;
