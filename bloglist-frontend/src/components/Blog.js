import React, { useState } from "react";
const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const showWhenVisible = { display: visible ? "" : "none" };
  const toggleVisibility = () => {
    setVisible(!visible);
  };
  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}{" "}
      <button onClick={toggleVisibility}>view</button>
      <div style={showWhenVisible}>
        {blog.url} <br />
        likes {blog.likes} <button>like</button> <br />
        {blog.user.name} <br />
      </div>
    </div>
  );
};

export default Blog;
