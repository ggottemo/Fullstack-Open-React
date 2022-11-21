import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../reducers/allUsersReducers";

const UserLib = () => {
  const userList = useSelector((state) => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return userList.map((user) => (
    <div key={user.name}>
      {user.name} has {user.blogs.length} blogs:{" "}
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            {" "}
            {blog.name} by {blog.author} at {blog.url}
          </li>
        ))}
      </ul>
    </div>
  ));
};

export default UserLib;
