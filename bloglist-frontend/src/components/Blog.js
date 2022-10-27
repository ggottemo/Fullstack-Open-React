import React, { useEffect, useState } from "react";
import blogService from "../services/blogs";
const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  useEffect(() => {
    setLikes(blog.likes);
  }, [blog.likes]);

  // Handle update
  const handleUpdate = async (event) => {
    event.preventDefault();
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    };
    const returnedBlog = await blogService.update(blog.id, updatedBlog);
    setLikes(returnedBlog.likes);
    console.log(returnedBlog);
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
        likes {likes} <button onClick={handleUpdate}>like</button> <br />
        {blog.user.name} <br />
      </div>
    </div>
  );
};

export default Blog;
