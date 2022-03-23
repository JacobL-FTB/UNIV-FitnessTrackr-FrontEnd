

const Activities = () => {

  const fetchActivties =  async () => {
    const resp = await fetch()
  }
  
  return 
  <h1>Activities Page</h1>
  {actvities.map((actvity) => (
    <div id="activities" key={actvities._id}>
      <Link to={`/actvitiies/${actvities._id}`}>
        <h2>{activity.title}</h2>{" "}
      </Link>
      <p>{activity.description}</p>
      <h3>{post.price}</h3>
     

      
    </div>))}
};

export default Activities;
