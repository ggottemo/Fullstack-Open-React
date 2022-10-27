import React, { useState } from "react";

const Login = ({ handleLogin }) => {
  // States
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="login_wrapper">
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            value={username}
            reset={null}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          password
          <input
            value={password}
            reset={null}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default Login;
