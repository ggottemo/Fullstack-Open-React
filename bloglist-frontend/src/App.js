import React, { useEffect, useRef, useState } from "react";
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
import { clear, set } from "./reducers/notificationReducer";

const App = () => {
  const [user, setUser] = useState(null);
  //const [blogs, setBlogs] = useState([]);

  // Redux
  const blogs = useSelector((state) => state.blogs);
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();
  // refs
  const blogFormRef = useRef();

  // Get blogs on page load
  useEffect(() => {
    (async () => {
      try {
        dispatch(fetchBlogs());
      } catch (exception) {
        dispatch(set(exception.text, "e"));
        setTimeout(() => {
          dispatch(clear());
        }, 5000);
      }
    })();
  }, []);

  // Check local storage for user token
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
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
      {user === null && (
        <Login setUserToken={setUser} updateNotification={set} />
      )}
      {user !== null && (
        <div>
          <LoginBanner user={user} />
          <LogoutButton setUserToken={setUser} />
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

