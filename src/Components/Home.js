const Home = ({ userData }) => {
  return (
    <>
      {userData ? (
        <div className="main-head">
          <h2>Hello {userData.username}</h2>
        </div>
      ) : (
        <h2>Home Page</h2>
      )}
    </>
  );
};

export default Home;
