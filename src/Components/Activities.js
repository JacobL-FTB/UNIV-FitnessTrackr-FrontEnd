import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BASE_URL = 'https://fitnesstrac-kr.herokuapp.com/api';

const Activities = ({
  userData,
  activities,
  fetchActivities,
  setError,
  error,
}) => {

  const [activityName, setActivityName] = useState([]);
  const [activityDescription, setActivityDescription] = useState([]);
  const [search, setSearch] = useState('');

  const lsToken = localStorage.getItem('token');

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
          <h3 className="title">Create Activity:</h3>
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
      <h1>Activities:</h1>
      <input
        type="text"
        className="TextInput"
        value={search}
        placeholder="Search"
        onChange={(event) => setSearch(event.target.value)}
      />
      {/* Show Activities  */}
      {activities.map((activity) => (
        <div id="activities" key={activity.id}>
          <Link to={`/activities/${activity.id}/routines`}>
            <h2>{activity.title}</h2>{" "}
          </Link>
          <h3>{activity.name}</h3>
          <p>{activity.description}</p>
          <Link to={`activities/${activity.id}`}><button>Edit Activity</button></Link>
          
        </div>
      ))}
    </div>
  );
};

export default Activities;
