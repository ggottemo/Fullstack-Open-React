import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import { sendNotification } from "../reducers/notificationReducer";

const CreateBlogForm = () => {
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  });
  const curUser = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <div>
      <h2>Create new</h2>
      <form>
        <div>
          title:
          <input
            id="title"
            name="title"
            type="text"
            value={newBlog.title}
            onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
          />
        </div>
        <div>
          author:
          <input
            id="author"
            name="author"
            type="text"
            value={newBlog.author}
            onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })}
          />
        </div>
        <div>
          url:
          <input
            id="url"
            name="url"
            type="text"
            value={newBlog.url}
            onChange={(e) => setNewBlog({ ...newBlog, url: e.target.value })}
          />
        </div>
        <button
          id="create-button"
          type="button"
          onClick={async (e) => {
            e.preventDefault();

            try {
              delete curUser.blogs;
              dispatch(
                createBlog({
                  ...newBlog,
                  user: curUser,
                })
              );
              dispatch(
                sendNotification(
                  `A new blog ${newBlog.title} by ${newBlog.author} added`,
                  "s"
                )
              );

              // hideForm();
            } catch (exception) {
              dispatch(sendNotification("Error creating blog", "e"));
              console.error(e);
            }
          }}
        >
          create
        </button>
      </form>
    </div>
  );
};

export default CreateBlogForm;
