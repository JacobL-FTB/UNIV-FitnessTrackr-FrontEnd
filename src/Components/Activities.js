import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BASE_URL = 'https://fitnesstrac-kr.herokuapp.com/api';

const Activities = () => {
const [activities, setActivities] = useState([]);
  
  const fetchActivities = async () => {
    const resp = await fetch(`${BASE_URL}/activities`);
    const info = await resp.json();
    console.log(info);
    if (resp.error) {
      throw new Error(resp.error);
    }
    setActivities(info);
  };



  useEffect(() => {
    fetchActivities();
  }, []);

  

  return (
    <>
     
     

     
      {activities.map((activity) => (
        
        <div id="activities" key={activity.id}>
          <Link to={`/activities/${activity.id}`}>
            <h2>{activity.title}</h2>{' '}
          </Link>
          <h3>{activity.name}</h3>
          <p>{activity.description}</p>
        </div>
      ))} </>
    
    
  );
 
};

export default Activities;
