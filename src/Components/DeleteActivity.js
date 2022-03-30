// import { useHistory } from "react-router-dom";
// import { useState } from "react";
// import { useParams } from "react-router-dom";

// const API_ROUTINES = "https://fitnesstrac-kr.herokuapp.com/api/routines";
// const API_ROUTINEACTIVITES =
//   '"https://fitnesstrac-kr.herokuapp.com/api/routine_activities";';

// const DeleteActivity = ({
//   activities,
//   setError,
//   fetchRoutines,
//   routines,
//   token,
// }) => {
//   const [count, setCount] = useState("");
//   const [duration, setDuration] = useState("");
//   const history = useHistory();
//   const id = useParams();
//   const [routineActivityId, setRoutineActivityId] = useState("");
//   console.log(id.routineId);
//   console.log(routines);
//   const routine = routines.filter((routine) => id.routineId == routine.id);
//   const activities = routine[0].activities;
//   console.log(routine);
//   // const filteredArray = activities.filter(
//   //   (activity) => activity.name === activity
//   // );
//   // console.log(filteredArray);

//   const [activity, setActivity] = useState("any");
//   const [activityId, setActivityId] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const response = await fetch(
//       `${API_ROUTINEACTIVITES}/${routineActivityId}`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           // Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           activityId,
//           count,
//           duration,
//         }),
//       }
//     );
//     const info = await response.json();
//     console.log(info);
//     if (info.error) {
//       return setError(info.error.message);
//     }
//     fetchRoutines();
//     history.push("/my-routines");
//   };

//   //   const handleClick = async (e) => {
//   //     try {
//   //       const response = await fetch(
//   //         `${API_ROUTINEACTIVITES}/${routineActivityId}`,
//   //         {
//   //           method: "DELETE",
//   //           headers: {
//   //             "Content-Type": "application/json",
//   //             Authorization: `Bearer ${token}`,
//   //           },
//   //         }
//   //       );
//   //       const info = await response.json();
//   //       console.log(info);
//   //     } catch (error) {
//   //       console.error(error);
//   //     }
//   //   };

//   return (
//     <>
//       <h4>Update Activities</h4>
//       {activities.map((activity) => {
//         <form
//           onSubmit={() => {
//             handleSubmit();
//             setRoutineActivityId(activity.routineActivityId);
//           }}
//         >
//           <input
//             className="input-posts"
//             type="text"
//             value={count}
//             placeholder={activity.count}
//             onChange={(e) => {
//               setCount(e.target.value);
//             }}
//           ></input>
//           <input
//             className="input-posts"
//             type="text"
//             value={duration}
//             placeholder={activity.duration}
//             onChange={(e) => {
//               setDuration(e.target.value);
//             }}
//           ></input>
//           <button type="submit">Update</button>
//         </form>;
//       })}

//       {/* <select
//           value={activityId}
//           onChange={(event) => {
//             setActivityId(event.target.value);
//             console.log(event.target.value);
//           }}
//         >
//           {activities.map((activity) => {
//             return (
//               <>
//                 <option key={activity.id} value={activity.id}></option>
//               </>
//             );
//           })}
//         </select> */}

//       {/* <input
//           className="input-posts"
//           type="text"
//           value={count}
//           placeholder="Count"
//           onChange={(e) => {
//             setCount(e.target.value);
//           }}
//         ></input>
//         <input
//           className="input-posts"
//           type="text"
//           value={duration}
//           placeholder="Duration"
//           onChange={(e) => {
//             setDuration(e.target.value);
//           }}
//         ></input> */}

//       <h1>Remove Activity From Routine</h1>
//       <div>
//         {routine[0].activities &&
//           routine[0].activities.map((activity) => {
//             console.log(activity.routineActivityId);
//             return (
//               <div key={activity.id}>
//                 <h4>Activity: {activity.name}</h4>
//                 <h4>Count:{activity.count}</h4>
//                 <h4>Duration:{activity.duration}</h4>
//                 <h4>id {activity.id}</h4>
//                 <button
//                   value={activity.routineActivityId}
//                   onClick={(e) => {
//                     setRoutineActivityId(e.target.value);
//                     handleClick();
//                   }}
//                   type="submit"
//                 >
//                   Delete Activity
//                 </button>
//               </div>
//             );
//           })}
//       </div>
//     </>
//   );
// };

// export default DeleteActivity;
