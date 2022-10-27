import { useEffect, useState } from "react";
import BlogLib from "./components/BlogLib.js";
import CreateBlogForm from "./components/CreateBlogForm.js";
import Login from "./components/Login.js";
import LoginBanner from "./components/LoginBanner.js";
import LogoutButton from "./components/LogoutButton.js";
import blogService from "./services/blogs";
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  // Get blogs on page load
  useEffect(() => {
    (async () => {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
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
      {user === null && <Login setUserToken={setUser} />}
      {user !== null && (
        <div>
          <LoginBanner user={user} />
          <LogoutButton setUserToken={setUser} />
          <BlogLib blogs={blogs} />
          <CreateBlogForm />
        </div>
      )}
    </div>
  );
};

export default App;
