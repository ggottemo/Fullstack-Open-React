import React, { useEffect, useRef } from "react";
import BlogLib from "./components/BlogLib.js";
import CreateBlogForm from "./components/CreateBlogForm.js";
import Login from "./components/Login.js";
import LoginBanner from "./components/LoginBanner.js";
import LogoutButton from "./components/LogoutButton.js";
import Notification from "./components/Notification.js";
import TogglableVis from "./components/utils/TogglableVis.js";
import blogService from "./services/blogs";

import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "./reducers/blogReducer.js";
import { sendNotification } from "./reducers/notificationReducer";
import userActions from "./reducers/userReducer";
import UserLib from "./components/UserLib";
import LoggedInUserView from "./components/LoggedInUserView";

const App = () => {
  // Redux
  const blogs = useSelector((state) => state.blogs);
  const notification = useSelector((state) => state.notification);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // refs
  const blogFormRef = useRef();
  const userViewRef = useRef();

  // Get blogs on page load
  useEffect(() => {
    (async () => {
      try {
        dispatch(fetchBlogs());
      } catch (exception) {
        dispatch(sendNotification(exception.response.data.error, "e"));
      }
    })();
  }, []);

  // Check local storage for user token
  useEffect(() => {
    const loggedUserJSON = null;
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      userActions.set(user.token);
      blogService.setToken(user.token);
    }
  }, []);
  // Rerender if  change

  const hideForm = () => {
    blogFormRef.current.toggleVisibility();
  };

  return (
    <div>
      <Notification
        message={notification.message}
        status={notification.status}
      />
      {(user === null || user === "") && <Login />}
      {user !== null && user !== "" && (
        <div>
          <LoginBanner user={user} />
          <LogoutButton />
          <LoggedInUserView />
          <TogglableVis buttonLabel="User View" ref={userViewRef}>
            <UserLib />
          </TogglableVis>
          <BlogLib blogs={blogs} />
          <TogglableVis buttonLabel="Create new blog" ref={blogFormRef}>
            <CreateBlogForm hideForm={hideForm} />
          </TogglableVis>
        </div>
      )}
    </div>
  );
};

export default App;
