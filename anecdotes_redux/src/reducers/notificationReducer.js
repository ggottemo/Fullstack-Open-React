import { createSlice } from "redux/toolkit";

const startingNotifications = [
  {
    message: "Test notification 1",
    id: (100000 * Math.random()).toFixed(0),
  },
];

export const notificationSlice = createSlice({
  name: "notifications",
  startingNotifications,
  reducers: {
    sendVote(state, action) {},
  },
});

export default notificationSlice.reducers();
