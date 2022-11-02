import { createSlice } from "@reduxjs/toolkit";

const getId = () => (100000 * Math.random()).toFixed(0);
const startingNotifications = ["Test notification 1", "Test notification 2"];

const asObject = (x) => {
  return {
    message: x,
    id: getId(),
  };
};

const initialState = startingNotifications.map(asObject);

const notificationSlice = createSlice({
  name: "notifications",
  initialState: [],
  reducers: {
    updateMessage(state, action) {
      state.push({
        message: action.payload,
        id: getId(),
      });
    },
    clearMessage(state, action) {
      return state.filter((x) => x.message !== action.payload);
    },
  },
});
export const { updateMessage, clearMessage } = notificationSlice.actions;
export default notificationSlice.reducer;
