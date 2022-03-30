import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const BASE_URL = "https://fitnesstrac-kr.herokuapp.com/api";

const Activities = ({
  userData,
  token,
  activities,
  setActivities,
  fetchActivities,
}) => {
  const [activityname, setActivityName] = useState([]);
  const [activityDescription, setActivityDescription] = useState([]);


//create activity
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (activityname)
    try {
      const response = await fetch(
        "http://fitnesstrac-kr.herokuapp.com/api/activities",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: activityname,
            description: activityDescription,
          }),
        }
      );
    } catch (error) {
      throw error;
    }
  };

//edit activity
  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch(`http://fitnesstrac-kr.herokuapp.com/api/activities/${activity.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          name: activityname,
          description: activityDescription,
          }),
        }
      );
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
      value={activityname}
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
      >
    </input>
    <button type="submit">Submit Actvity</button>
    </form>
    ):(
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
        </div>
      ))}
    </div>
  );
};

export default Activities;
