
const ActivitiesRoutines = ({}) => {


const fetchActivitiesRoutines = async () => {
    const resp = await fetch(`http://fitnesstrac-kr.herokuapp.com/api/activities/${routine.id}`);
    const info = await resp.json();
    if (resp.error) {
      throw new Error(resp.error);
    }
    setActivitiesRoutines(info);
  };

useEffect(() => {
    fetchActivitiesRoutines();
  }, []);

 {activitiesRoutines.map((activity) => (
    <div id="activities" key={activity.id}>
      <Link to={`/activities/${activity.id}`}>
        <h2>{activity.title}</h2>{" "}
      </Link>
      <h3>{activity.name}</h3>
      <p>{activity.goal}</p>
      <p>{activity.creatorName}</p>
    </div>
  ))}}