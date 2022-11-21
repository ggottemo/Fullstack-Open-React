import { createSlice } from "@reduxjs/toolkit";
import { getAllUsers } from "../services/users";
import { sendNotification } from "./notificationReducer";

const allUsersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    set(state, action) {
      return action.payload;
    },
    clear() {
      return [];
    },
  },
});

export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const userList = await getAllUsers();
      dispatch(set(userList));
    } catch (e) {
      dispatch(sendNotification(e.response.data.error, "e"));
    }
  };
};

export const { set, clear } = allUsersSlice.actions;
export default allUsersSlice.reducer;
