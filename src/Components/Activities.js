import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BASE_URL = 'https://fitnesstrac-kr.herokuapp.com/api'

const Activities = () => {
const [activities, setActivities] = useState([])

  const fetchActivties =  async () => {
    const resp = await fetch(`${BASE_URL}/activities`)
    const info = await resp.json();
    setActivities(info.data.activities)
  }
  
  
  useEffect(() => {
    fetchActivties();
  }, []);
  
  return (
  <>
  <h1>Activities Page</h1>
  {activities.map((actvity) => (
    <div id="activities" key={actvity._id}>
      <Link to={`/activities/${actvity._id}`}>
        <h2>{activity.title}</h2>{" "}
      </Link>
      <h3>{activity.name}</h3>
      <p>{activity.description}</p>
      
     

      
    </div>))}
  </>
  )
};

export default Activities;
