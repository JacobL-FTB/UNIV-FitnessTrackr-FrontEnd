import { React, useEffect } from 'react';
import { Link } from 'react-router-dom';
const Routines = (props) => {
  const { routines, setRoutines, userData } = props;

  async function fetchRoutines() {
    const response = await fetch(
      'http://fitnesstrac-kr.herokuapp.com/api/routines'
    );
    setRoutines(await response.json());
  }
  useEffect(fetchRoutines, []);

  console.log(routines);

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
              <h3 className="routineGoal">{routine.goal}</h3>
              <h6 className="routineCreator">{routine.creatorName}</h6>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Routines;
