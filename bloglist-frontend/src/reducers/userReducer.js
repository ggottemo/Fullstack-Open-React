import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: [],
  reducers: {
    set() {
      return window.localStorage.getItem("loggedBloglistUser");
    },
    clear() {
      return "";
    },
  },
});

export const { set, clear } = userSlice.actions;
export default userSlice.reducers;
