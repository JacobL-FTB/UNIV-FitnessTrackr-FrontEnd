
const ActivitiesRoutines = ({activitiesRoutines, setActivitiesRoutines, setError, error}) => {


const fetchActivitiesRoutines = async () => {
    const resp = await fetch(`http://fitnesstrac-kr.herokuapp.com/api/activities/${activity.id}/routines`);
    const info = await resp.json();
    if (resp.error) {
      throw new Error(resp.error);
    }
    setActivitiesRoutines(info);
  };

useEffect(() => {
    fetchActivitiesRoutines();
  }, []);


  return (
      <div>
 {activitiesRoutines.map((activity) => (
    <div id="activities" key={activity.id}>
      <Link to={`/activities/${activity.id}`}>
        <h2>{activity.title}</h2>{" "}
      </Link>
      <h3>{activity.name}</h3>
      <p>{activity.goal}</p>
      <p>{activity.creatorName}</p>
    </div>
  ))}
</div>
  )}
  export default ActivitiesRoutines;