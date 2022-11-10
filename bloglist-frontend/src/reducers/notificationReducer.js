import { createSlice } from "@reduxjs/toolkit";

const initialState = { message: "", status: "" };

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    set(state, action) {
      state.message = action.payload.message;
      state.status = action.payload.status;
    },
    clear(state) {
      state.message = "";
      state.status = "";
    },
  },
});

export const sendNotification = (message, status) => {
  return async (dispatch) => {
    dispatch(set({ message, status }));
    await (() => {
      setTimeout(() => {
        dispatch(clear());
      }, 5000);
    })();
  };
};

export const { set, clear } = notificationSlice.actions;

export default notificationSlice.reducer;
