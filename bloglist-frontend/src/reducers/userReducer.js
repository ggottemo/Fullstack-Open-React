import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login.js";
import blogService from "../services/blogs";
import { sendNotification } from "./notificationReducer";

const userSlice = createSlice({
  name: "user",
  initialState: [],
  reducers: {
    set(state, action) {
      return action.payload;
    },
    clear() {
      return "";
    },
    add(state, action) {
      return state.concat(action.payload);
    },
  },
});

export const loginUser = (user) => {
  return async (dispatch) => {
    try {
      const loggedInUser = await loginService(user);
      blogService.setToken(loggedInUser.token);
      dispatch(set(loggedInUser));
    } catch (e) {
      dispatch(sendNotification(e.response.data.error));
    }
  };
};

export const { add, set, clear } = userSlice.actions;
export default userSlice.reducer;
