import React from "react";

const Login = ({ handleLogin, username, password }) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input reset={null} />
        </div>
        <div>
          password
          <input reset={null} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};
