import React, { useState } from "react";

const Login = ({ handleLogin }) => {
  // States
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            value={username}
            reset={null}
            onChange={(val) => setUsername(val)}
          />
        </div>
        <div>
          password
          <input
            value={password}
            reset={null}
            onChange={(val) => setPassword(val)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default Login;
