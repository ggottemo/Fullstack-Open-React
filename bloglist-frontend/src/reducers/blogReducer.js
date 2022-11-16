import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { sendNotification } from "./notificationReducer";

const blogReducer = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    remove(state, action) {
      return state.map((x) => (x.id !== action.payload ? x : ""));
    },
    addBlog(state, action) {
      return state.concat(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
  },
});

// Async create blog reducer
export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blog);
      dispatch(addBlog(newBlog));
    } catch (error) {
      console.log(error);
    }
  };
};

// Async fetch blogs
export const fetchBlogs = () => {
  return async (dispatch) => {
    try {
      const blogs = await blogService.getAll();
      dispatch(setBlogs(blogs));
      //collection(blogs);
    } catch (error) {
      console.log(error);
    }
  };
};

// Async remove blog
export const removeBlog = (id) => {
  return async (dispatch) => {
    try {
      const blog = await blogService.getOne(id);
      if (blog) {
        await blogService.remove(id);
        dispatch(remove(id));
        dispatch(sendNotification(`${blog.title} has been deleted`, "s"));
      }
    } catch (e) {
      console.log(e);
      dispatch(sendNotification(e.message));
    }
  };
};

export const { remove, addBlog, setBlogs } = blogReducer.actions;
export default blogReducer.reducer;
