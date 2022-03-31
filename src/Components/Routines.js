import { React, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Routines = (props) => {
  const { routines, userData, setRoutineData } = props;

  return (
    <div>
      <div id="routines">
        {routines.map((routine) => {
          return (
            <div key={routine.id} className="routineView">
              <h1 className="routineName">{routine.name}</h1>
              <h2 className="routineGoal">"{routine.goal}"</h2>
              <h4 className="routineCreator">By: {routine.creatorName}</h4>
              <ul>
                {routine.activities.map((activity) => {
                  return (
                    <li className="activity" key={activity.id}>
                      <div>
                        <p>Activity: {activity.name}</p>
                        <p>Description: {activity.description}</p>
                        <p>Count: {activity.count}</p>
                        <p>Duration: {activity.duration}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Routines;
