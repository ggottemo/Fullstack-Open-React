import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogReducer = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    remove(state, action) {
      return state.map((x) => (x !== action.payload ? x : ""));
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
      await blogService.create(blog);
      dispatch(addBlog(blog));
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

export const { remove, addBlog, setBlogs } = blogReducer.actions;
export default blogReducer.reducer;

