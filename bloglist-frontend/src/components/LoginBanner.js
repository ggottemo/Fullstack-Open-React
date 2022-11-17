import React from "react";
import { useSelector } from "react-redux";

const LoginBanner = () => {
  const user = useSelector((state) => state.user);
  return (
    <div className="login_banner">
      <p>{user.name} logged in</p>
    </div>
  );
};

export default LoginBanner;
