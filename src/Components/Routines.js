import { React, useState } from 'react';

const Routines = (props) => {
  const { routines, userData, setRoutineData } = props;
  const [search, setSearch] = useState('');

  const filter = (routine, text) => {
    text = text.toLowerCase();
    if (
      routine.name.toLowerCase().includes(search) ||
      routine.goal.toLowerCase().includes(search)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const filteredRoutines = routines.filter((filterroutine) =>
    filter(filterroutine, search)
  );
  const routinesToDisplay = search.length ? filteredRoutines : routines;

  return (
    <div>
      <br />
      <h1 className="title">Routines:</h1>
      <div id="routines">
        <input
          type="text"
          className="TextInput"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
          placeholder="Search"
        />
        {routinesToDisplay.map((routine) => {
          return (
            <div key={routine.id} className="routineView">
              <h2 className="routineName">{routine.name}</h2>
              <h4 className="routineGoal">"{routine.goal}"</h4>
              <h5 className="routineCreator">By: {routine.creatorName}</h5>
              <ul>
                {routine.activities.map((activity) => {
                  return (
                    <li className="activity" key={activity.id}>
                      <div>
                        <p>Activity: "{activity.name}"</p>
                        <p>Description: "{activity.description}"</p>
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
