import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const BASE_URL = "https://fitnesstrac-kr.herokuapp.com/api";

const Activities = ({
  userData,
  activities,
  fetchActivities,
  setError,
  error,
}) => {
  const [activityName, setActivityName] = useState([]);
  const [activityDescription, setActivityDescription] = useState([]);
 

  const lsToken = localStorage.getItem("token");

  //create activity
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(
        "http://fitnesstrac-kr.herokuapp.com/api/activities",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${lsToken}`,
          },
          body: JSON.stringify({
            name: activityName,
            description: activityDescription,
          }),
        }
      );
      const info = await response.json();
      setActivityName("");
      setActivityDescription("");
      fetchActivities();
    } catch (error) {
      throw error;
    }
  };

  

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <div>
      <h1>Activities Page</h1>
      {/* Create Activity  */}
      {userData ? (
        <form className="CreateActivity" onSubmit={handleSubmit}>
          <input
            required
            type="text"
            value={activityName}
            placeholder="Activity Name"
            onChange={(e) => {
              e.preventDefault();
              setActivityName(e.target.value);
            }}
          ></input>
          <input
            required
            value={activityDescription}
            type="text"
            placeholder="Description"
            onChange={(e) => {
              e.preventDefault();
              setActivityDescription(e.target.value);
            }}
          ></input>
          <button type="submit">Submit Actvity</button>
        </form>
      ) : (
        <></>
      )}

      {/* Show Activities  */}
      {activities.map((activity) => (
        <div id="activities" key={activity.id}>
          <Link to={`/activities/${activity.id}`}>
            <h2>{activity.title}</h2>{" "}
          </Link>
          <h3>{activity.name}</h3>
          <p>{activity.description}</p>
          <button>Edit</button>
        </div>
      ))}
    </div>
  );
};

export default Activities;
