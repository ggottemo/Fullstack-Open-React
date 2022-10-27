import { useEffect, useState } from "react";
import BlogLib from "./components/BlogLib.js";
import CreateBlogForm from "./components/CreateBlogForm.js";
import Login from "./components/Login.js";
import LoginBanner from "./components/LoginBanner.js";
import LogoutButton from "./components/LogoutButton.js";
import Notification from "./components/Notification.js";
import blogService from "./services/blogs";
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({
    text: null,
    status: null,
  });

  // Get blogs on page load
  useEffect(() => {
    (async () => {
      try {
        const blogs = await blogService.getAll();
        setBlogs(blogs);
      } catch (exception) {
        setNotification({
          text: "Error getting blogs",
          status: "e",
        });
        setTimeout(() => {
          setNotification({
            text: null,
            status: null,
          });
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

  return (
    <div>
      <Notification message={notification} />
      {user === null && (
        <Login setUserToken={setUser} updateNotification={setNotification} />
      )}
      {user !== null && (
        <div>
          <LoginBanner user={user} />
          <LogoutButton setUserToken={setUser} />
          <BlogLib blogs={blogs} />
          <CreateBlogForm updateNotification={setNotification} />
        </div>
      )}
    </div>
  );
};

export default App;
