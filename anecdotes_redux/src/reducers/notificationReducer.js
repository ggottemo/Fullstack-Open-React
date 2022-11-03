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
    insertTimeout(state, action) {
      return state.map((x, i) =>
        i === state.length - 1 ? { ...state[i], timeout: action.payload } : x
      );
    },
    cancelNotification(state, action) {
      state.map((x) => clearTimeout(x.timeout));
    },
  },
});

export const setNotification = (message, duration) => {
  return async (dispatch) => {
    await dispatch(cancelNotification);
    dispatch(updateMessage(message));
    dispatch(
      insertTimeout(
        setTimeout(() => {
          dispatch(clearMessage(message));
        }, duration)
      )
    );
  };
};

export const {
  updateMessage,
  clearMessage,
  insertTimeout,
  cancelNotification,
} = notificationSlice.actions;
export default notificationSlice.reducer;
