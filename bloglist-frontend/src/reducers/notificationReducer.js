import { createSlice } from "@reduxjs/toolkit";

const initialState = { message: "" };

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    set(state, action) {
      state.message = action.payload;
    },
    clear(state) {
      state.message = "";
    },
  },
});

export const { set, clear } = notificationSlice.actions;

export default notificationSlice.reducer;
