import { Link } from "react-router-dom";

const Navbar = ({ setToken, userData, setUserData }) => {
  return (
    <>
      <Link className="link" to="/">
        Home
      </Link>
      <Link className="link" to="/activities">
        Activities
      </Link>
      <Link className="link" to="/routines">
        Routines
      </Link>
      {userData ? (
        <Link className="link" to="/my-routines">
          My Routines
        </Link>
      ) : (
        <Link className="link" to="/register">
          Register
        </Link>
      )}
      <Link
        className="link"
        to="/"
        onClick={() => {
          setToken("");
          localStorage.removeItem("token");
          setUserData(null);
        }}
      >
        Logout
      </Link>
    </>
  );
};

export default Navbar;
