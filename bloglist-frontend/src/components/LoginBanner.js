import React from "react";

const LoginBanner = () => {
  const user = JSON.parse(window.localStorage.getItem("loggedBloglistUser"));
  return (
    <div className="login_banner">
      <p>{user.name} logged in</p>
    </div>
  );
};

export default LoginBanner;
