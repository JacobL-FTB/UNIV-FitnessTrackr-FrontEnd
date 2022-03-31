import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ActivitiesEdit = ({}) => {
  //edit activity
  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch(
        `http://fitnesstrac-kr.herokuapp.com/api/activities/${activity.id}`,
        {
          method: 'PATCH',
          body: JSON.stringify({
            name: activityName,
            description: activityDescription,
          }),
        }
      );
    } catch (error) {
      throw error;
    }
  };
};
