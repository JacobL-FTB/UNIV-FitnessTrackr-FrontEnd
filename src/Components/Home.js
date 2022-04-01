import { Link } from "react-router-dom";

const Home = ({ userData }) => {
  return (
    <>
      {userData ? (
        <div className="main-head">
          <h2>Hello {userData.username}</h2>
          <Link className="main-link" to="/my-routines">
            My Routines
          </Link>
        </div>
      ) : (
        <h2>Home Page</h2>
      )}
    </>
  );
};

export default Home;
