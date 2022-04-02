import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ActivityRoutines = ({ activitiesRoutines }) => {
  const [routines, setRoutines] = useState([]);
  //
  const fetchActivitiesRoutines = async (id) => {
    const resp = await fetch(
      `http://fitnesstrac-kr.herokuapp.com/api/activities/${id}/routines`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const info = await resp.json();
    if (!info.error) {
      setRoutines(info);
    }
    if (resp.error) {
      throw new Error(resp.error);
    }
  };

  useEffect(() => fetchActivitiesRoutines(activitiesRoutines.id), []);

  return (
    <div>
      {routines[0] ? (
        routines.map((activity) => (
          <div className="activities" key={activity.id}>
            <Link to={`/activities/${activity.id}`}>
              <h2>{activity.title}</h2>{' '}
            </Link>
            <h2>{activity.name}</h2>
            <p>"{activity.goal}"</p>
            <p>by: {activity.creatorName}</p>
          </div>
        ))
      ) : (
        <h2>Error 404: No Routines Found</h2>
      )}
    </div>
  );
};
export default ActivityRoutines;
