import { Link } from 'react-router-dom';
//

const Navbar = ({ setToken, userData, setUserData }) => {
  return (
    <>
      <div id="navbar">
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
          <Link
            className="link"
            to="/register"
            hidden={!userData ? false : true}
          >
            Register
          </Link>
        )}
        <Link
          className="link"
          to="/"
          hidden={userData ? false : true}
          onClick={() => {
            setToken('');
            localStorage.removeItem('token');
            setUserData(null);
          }}
        >
          Logout
        </Link>
      </div>
    </>
  );
};

export default Navbar;
