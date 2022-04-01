import { useEffect } from 'react';

const ActivityRoutines = ({ activitiesRoutines, setActivitiesRoutines }) => {
  console.log(activitiesRoutines);
  let routines = [];
  const fetchActivitiesRoutines = async () => {
    const resp = await fetch(
      `http://fitnesstrac-kr.herokuapp.com/api/activities/${activitiesRoutines.id}/routines`
    );
    routines = await resp.json();
    if (resp.error) {
      throw new Error(resp.error);
    }
  };

  useEffect(() => {
    fetchActivitiesRoutines();
  }, []);

  return (
    <div>
      {routines.map((activity) => (
        <div id="activities" key={activity.id}>
          <Link to={`/activities/${activity.id}`}>
            <h2>{activity.title}</h2>{' '}
          </Link>
          <h3>{activity.name}</h3>
          <p>{activity.goal}</p>
          <p>{activity.creatorName}</p>
        </div>
      ))}
    </div>
  );
};
export default ActivityRoutines;
