import { configureStore } from "@reduxjs/toolkit";
import anecdotesReducer from "./reducers/anecdoteReducer";
import filterReducer from "./reducers/filterReducer";
import notificationReducer from "./reducers/notificationReducer";

export const store = configureStore({
  reducer: {
    anecdotes: anecdotesReducer,
    notifications: notificationReducer,
    filter: filterReducer,
  },
});
