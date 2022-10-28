import React, { useState } from "react";
import blogService from "../services/blogs";

const CreateBlogForm = ({ updateNotification, hideForm }) => {
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  });
  return (
    <div>
      <h2>Create new</h2>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            await blogService.create(newBlog);
            updateNotification({
              text: `A new blog ${newBlog.title} by ${newBlog.author} added`,
              status: "s",
            });
            setTimeout(() => {
              updateNotification({
                text: null,
                status: null,
              });
            }, 5000);
            hideForm.current.toggleVisibility();
          } catch (exception) {
            updateNotification({
              text: "Error creating blog",
              status: "e",
            });
            setTimeout(() => {
              updateNotification({
                text: null,
                status: null,
              });
            }, 5000);
          }
        }}
      >
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
        <button id="create-button" type="submit">
          create
        </button>
      </form>
    </div>
  );
};

export default CreateBlogForm;
