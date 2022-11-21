import React from "react";
import { useSelector } from "react-redux";

const LoggedInUserView = () => {
  const loggedInUser = useSelector((state) => state.user);
  if (!loggedInUser) {
    return <div>Error finding logged in user</div>;
  }
  if (!loggedInUser.blogs) {
    return <h3> No blogs found</h3>;
  }
  return (
    <div>
      <h4>Your blogs:</h4>
      <ul>
        {loggedInUser.blogs.map((blog) => (
          <li key={blog.title}>
            {" "}
            <a href={blog.url}>
              {blog.title} by {blog.author}
            </a>{" "}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LoggedInUserView;
