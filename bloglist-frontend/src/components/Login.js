import React, { useState } from "react";
import blogService from "../services/blogs";
import loginService from "../services/login";
import { useDispatch } from "react-redux";
import { sendNotification } from "./../reducers/notificationReducer.js";

const Login = ({ setUserToken }) => {
  const dispatch = useDispatch();
  // States
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Event handlers
  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("Logging in with", username, password);
    try {
      const user = await loginService({
        username,
        password,
      });
      // Save the token to the browser's local storage
      window.localStorage.setItem("loggedBloglistUser", JSON.stringify(user));

      setUserToken(user);
      setUsername("");
      setPassword("");
      blogService.setToken(user.token);
    } catch (exception) {
      dispatch(sendNotification("Wrong username or password", "e"));
    }
  };

  return (
    <div className="login_wrapper">
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id="username"
            value={username}
            reset={null}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            value={password}
            reset={null}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  );
};

export default Login;
