import { createSlice } from "@reduxjs/toolkit";

const blogReducer = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    remove(state, action) {
      return state.map((x) => (x !== action.payload ? x : ""));
    },
  },
});

export const { remove } = blogReducer.actions;
export default blogReducer.reducer;
