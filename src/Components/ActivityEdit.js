import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router';

const ActivityEdit = ({ activities, fetchActivities, token }) => {
  const history = useHistory();
  const { activityId } = useParams();
  const activity1 = activities.filter((post) => post.id == activityId);
  const [activity, setActivity] = useState({ name: '', description: '' });
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');

  useEffect(() => {
    if (activity1[0]) {
      setActivity(activity1[0]);
    }
  }, []);

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://fitnesstrac-kr.herokuapp.com/api/activities/${activity1[0].id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: newName,
            description: newDescription,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      fetchActivities();
      history.push('/activities');
    } catch (error) {
      throw error;
    }
  };

  return (
    <div>
      <div id="edit-form">
        <form className="activityForm" onSubmit={handleSubmitEdit}>
          <h1>Edit Activity</h1>
          <div id="edit-form-title">Edit Form</div>
          <input
            required
            className="TextInput"
            value={newName}
            placeholder={activity.name}
            onChange={(e) => {
              setNewName(e.target.value);
            }}
          />
          <input
            required
            className="TextInput"
            value={newDescription}
            placeholder={activity.description}
            onChange={(e) => {
              setNewDescription(e.target.value);
            }}
          />
          <br />
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ActivityEdit;
