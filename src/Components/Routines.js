import { React, useEffect } from 'react';
import { Link } from 'react-router-dom';

//

const Routines = (props) => {
  const { routines, setRoutines, userData, setRoutineData } = props;

  async function fetchRoutines() {
    const response = await fetch(
      'http://fitnesstrac-kr.herokuapp.com/api/routines'
    );
    setRoutines(await response.json());
  }
  useEffect(fetchRoutines, []);

  const deleteRoutine = (id) => {};

  return (
    <div>
      {userData ? (
        <Link className="createRoutine" to="/Create-Routine">
          Create New Routine
        </Link>
      ) : (
        <></>
      )}
      <div id="routines">
        {routines.map((routine) => {
          return (
            <div key={routine.id} className="routineView">
              <h1 className="routineName">{routine.name}</h1>
              <h2 className="routineGoal">"{routine.goal}"</h2>
              <h4 className="routineCreator">By: {routine.creatorName}</h4>
              {userData ? (
                userData.username === routine.creatorName ? (
                  <Link className="Edit" to="/Add-Activity">
                    Add an activity
                  </Link>
                ) : (
                  <></>
                )
              ) : (
                <></>
              )}
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
              {userData ? (
                userData.username === routine.creatorName ? (
                  <>
                    <Link
                      className="button"
                      to="/Edit-Routine"
                      onClick={() => {
                        setRoutineData(routine);
                      }}
                    >
                      Edit Routine
                    </Link>
                    <button
                      className="button"
                      onClick={() => {
                        deleteRoutine(routine.id);
                      }}
                    >
                      Delete Routine
                    </button>
                  </>
                ) : (
                  <></>
                )
              ) : (
                <></>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Routines;
