import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

const BASE_URL = 'https://fitnesstrac-kr.herokuapp.com/api/';
const API_LOGIN = 'http://fitnesstrac-kr.herokuapp.com/api/users/login';
const API_REGISTER = 'http://fitnesstrac-kr.herokuapp.com/api/users/register';
const API_USER = 'http://fitnesstrac-kr.herokuapp.com/api/users/me';

const Login_Register = ({
  token,
  setToken,
  action,
  error,
  setError,
  setUserData,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const isLogin = action === 'login';
  const title = isLogin ? 'Login' : 'Register';
  const oppositeTitle = isLogin ? 'Register' : 'Login';
  const oppositeAction = isLogin ? 'register' : 'login';
  const actionURL = isLogin ? API_LOGIN : API_REGISTER;
  const history = useHistory();

  // const fetchUser = async () => {
  //   const lsToken = localStorage.getItem("token");
  //   console.log(lsToken);
  //   if (lsToken) {
  //     setToken(lsToken);
  //   }
  //   try {
  //     const response = await fetch(`${API_USER}`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${lsToken}`,
  //       },
  //     });
  //     const info = await response.json();
  //     console.log(info);
  //     setUserData(info.user);
  //     // setUsername(info.user.username);
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  // useEffect(() => {
  //   fetchUser();
  // }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!isLogin && password !== confirm) {
      setError('Passwords do not match');
    } else {
      try {
        const response = await fetch(`${actionURL}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            password,
          }),
        });
        const info = await response.json();
        console.log(info);
        if (info.error) {
          return setError(info.error);
        }
        setToken(info.token);
        localStorage.setItem('token', info.token);
        history.push('/');
      } catch (error) {
        throw error;
      }
    }
  };

  return (
    <>
      <h3 className="main-login">{title}</h3>
      <form className="sign-in" onSubmit={handleSubmit}>
        <input
          required
          type="text"
          value={username}
          placeholder="Username"
          onChange={(e) => {
            e.preventDefault();
            setUsername(e.target.value);
          }}
        ></input>
        <input
          required
          value={password}
          type="password"
          placeholder="Password"
          onChange={(e) => {
            e.preventDefault();
            setPassword(e.target.value);
          }}
        ></input>
        {!isLogin ? (
          <input
            required
            value={confirm}
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => {
              e.preventDefault();
              setConfirm(e.target.value);
            }}
          ></input>
        ) : null}
        <button type="submit">{title}</button>
        <p id="error">{error}</p>
        <Link className="link" to={`${oppositeAction}`}>
          Click here to {oppositeTitle}
        </Link>
      </form>
    </>
  );
};

export default Login_Register;
