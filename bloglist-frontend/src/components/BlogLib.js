import PropTypes from "prop-types";
import React from "react";
import Blog from "./Blog";

const BlogLib = ({ blogs }) => {
  return (
    <div>
      <h2>blogs</h2>
      {blogs
        .map((blog) => <Blog key={blog.id} blog={blog} />)
        .sort((a, b) => b.props.blog.likes - a.props.blog.likes)}
    </div>
  );
};

BlogLib.propTypes = {
  blogs: PropTypes.array.isRequired,
};

export default BlogLib;
