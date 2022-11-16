import React, { useEffect, useState } from "react";
import blogService from "../services/blogs";
import { removeBlog } from "../reducers/blogReducer";
import { useDispatch } from "react-redux";

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const dispatch = useDispatch();

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
  // Handle Delete
  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
        await dispatch(removeBlog(blog.id));
      }
    } catch (e) {
      console.log(e);
    }
  };

  // Handle update
  const handleUpdate = async (event) => {
    event.preventDefault();
    const updatedBlog = {
      user: JSON.parse(window.localStorage.getItem("loggedBloglistUser")).token,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: likes + 1,
    };
    const returnedBlog = await blogService.update(blog.id, updatedBlog);
    setLikes(returnedBlog.likes);
  };

  const showWhenVisible = { display: visible ? "" : "none" };
  const toggleVisibility = () => {
    setVisible(!visible);
  };
  return (
    <div style={blogStyle} className="blog">
      {blog.title} {blog.author}{" "}
      <button onClick={toggleVisibility}>view</button>
      <div style={showWhenVisible}>
        {blog.url} <br />
        likes {likes} <button onClick={handleUpdate}>like</button> <br />
        {blog.user.name ?? blog.user.token ?? blog.user ?? "No Name Found"}{" "}
        <br />
        <button onClick={handleDelete}>remove</button>
      </div>
    </div>
  );
};

export default Blog;
