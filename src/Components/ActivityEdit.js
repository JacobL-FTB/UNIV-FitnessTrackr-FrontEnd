import { useState } from "react";
import { useParams } from "react-router-dom";


const ActivitiesEdit = ({
    activities,
    setActivities,
    fetchActivities,
    setError, 
    error
}) => {
    const { id } = useParams();
    const { name, description } = activities.filter(
          (post) => post._id === id
        )[0];
    const origPost = {
          name: name,
          description: description,
        };
    const [error, setError] = useState("");
    const [activity, setActvity] = useState(origPost);

//edit activity
const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://fitnesstrac-kr.herokuapp.com/api/activities/${activity.id}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            name: activityName,
            description: activityDescription,
          }),
        }
      );
      fetchActivities();
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
            value={activityName}
            placeholder="Name"
            onChange={(e) => {
              setActvity({ ...post, name: e.target.value });
            }}
          />
          <input
            value={activityDescription}
            placeholder="Description"
            onChange={(e) => {
              setActvity({ ...post, description: e.target.value });
            }}
          />
          <button>Submit</button>
         </form>
          </div>
    </div>
  );
}

export default ActivitiesEdit;