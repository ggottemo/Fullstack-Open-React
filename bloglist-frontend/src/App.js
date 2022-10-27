import { useEffect, useState } from "react";
import BlogLib from "./components/BlogLib";
import Login from "./components/Login";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  return (
    <div>
      {user === null && <Login />}
      {user !== null && <BlogLib blogs={blogs} />}
    </div>
  );
};

export default App;
