import { useState } from "react";

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
}) => {
  const history = useHistory();
  const { id } = useParams();
  const routine = routines.filter((routine) => id === routine.id);
  const { isPublic, setIsPublic } = useState(true);

  const createForm = () => {
    if (name === "") {
      setName(routine.name);
    }
    if (goal === "") {
      setGoal(post.goal);
    }
    if (isPublic) {
      setIsPublic(!isPublic);
    }
  };

  useEffect(() => {
    createForm();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${API_ROUTINES}/${id}`, {
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
    const info = await response.json();
    if (info.error) {
      return setError(info.error.message);
    }
    fetchRoutines();
    history.push("/posts");
  };

  return posts.map((post) => {
    return (
      post._id === id && (
        <div id="create-post" key={post._id}>
          <h3>Edit Post</h3>
          <form className="new-post" onSubmit={handleSubmit}>
            <input
              className="input-posts"
              type="text"
              value={title}
              placeholder={post.title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            ></input>
            <input
              className="input-posts"
              type="text"
              value={description}
              placeholder={post.description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></input>
            <input
              className="input-posts"
              type="text"
              value={price}
              placeholder={post.price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            ></input>
            <input
              className="input-posts"
              value={location}
              placeholder={post.location}
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            ></input>
            <label htmlFor="select-delivery">Delivery?</label>
            <select
              id="select-delivery"
              name="Delivery?"
              value={willDeliver}
              onChange={(e) => {
                setWillDeliver(e.target.value);
              }}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            <button type="submit">Update Post</button>
          </form>
          <p>{error}</p>
        </div>
      )
    );
  });
};

export default EditRoutine;
