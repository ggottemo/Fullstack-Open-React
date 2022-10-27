import { useEffect, useState } from "react";
import BlogLib from "./components/BlogLib.js";
import Login from "./components/Login.js";
import LoginBanner from "./components/LoginBanner.js";
import blogService from "./services/blogs";
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  return (
    <div>
      {user === null && <Login setUserToken={setUser} />}
      {user !== null && <LoginBanner />}
      {user !== null && <BlogLib blogs={blogs} />}
    </div>
  );
};

export default App;
