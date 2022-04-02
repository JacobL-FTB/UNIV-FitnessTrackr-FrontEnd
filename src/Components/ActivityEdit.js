import { useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router";

const ActivitiesEdit = ({ activities, fetchActivities, token }) => {
  const history = useHistory();
  const { activityId } = useParams();
  const activity1 = activities.filter((post) => post.id == activityId);

  const origPost = {
    name: activity1[0].name,
    description: activity1[0].description,
  };

  const [activity, setActvity] = useState(origPost);
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://fitnesstrac-kr.herokuapp.com/api/activities/${activity1[0].id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
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
      history.push("/activities");
    } catch (error) {
      throw error;
    }
  };

  return (
    <div>
      <h1>Edit Activity</h1>
      <div id="edit-form">
        <form className="activity-form" onSubmit={handleSubmitEdit}>
          <div id="edit-form-title">Edit Form</div>
          <input
            value={newName}
            placeholder={activity.name}
            onChange={(e) => {
              setNewName(e.target.value);
            }}
          />
          <input
            value={newDescription}
            placeholder={activity.description}
            onChange={(e) => {
              setNewDescription(e.target.value);
            }}
          />
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ActivitiesEdit;
