import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

const BASE_URL = 'https://fitnesstrac-kr.herokuapp.com/api';
//
const Activities = ({
  userData,
  activities,
  fetchActivities,
  setActivitiesRoutines,
  setError,
}) => {
  const [activityName, setActivityName] = useState([]);
  const [activityDescription, setActivityDescription] = useState([]);
  const [search, setSearch] = useState('');
  const lsToken = localStorage.getItem('token');
  const history = useHistory();

  //create activity
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(
        'http://fitnesstrac-kr.herokuapp.com/api/activities',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${lsToken}`,
          },
          body: JSON.stringify({
            name: activityName,
            description: activityDescription,
          }),
        }
      );
      const info = await response.json();
      setActivityName('');
      setActivityDescription('');
      fetchActivities();
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const filter = (activity, text) => {
    text = text.toLowerCase();
    if (
      activity.name.toLowerCase().includes(text) ||
      activity.description.toLowerCase().includes(text)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const filterActivities = activities.filter((activity) =>
    filter(activity, search)
  );
  const ActivitiesToShow = search.length ? filterActivities : activities;

  return (
    <div className="ActivitiesPage">
      {/* Create Activity  */}
      {userData ? (
        <form className="CreateActivity" onSubmit={handleSubmit}>
          <h3 className="title">Create Activity</h3>
          <input
            required
            className="TextInput"
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
            className="TextInput"
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
      <br />
      <h1 className="page-titles">Activities</h1>
      <div id="search">
        <input
          type="text"
          className="TextInput"
          value={search}
          placeholder="Search"
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>
      {/* Show Activities  */}
      {ActivitiesToShow.map((activity) => (
        <div className="activities" key={activity.id}>
          <h2
            onClick={() => {
              setActivitiesRoutines(activity);
              history.push(`/activities/${activity.id}/routines`);
            }}
          >
            {activity.name}
          </h2>
          <p>{activity.description}</p>
          <Link id="activityedit" to={`activities/${activity.id}`}>
            Edit
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Activities;
