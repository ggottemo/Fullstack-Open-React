import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "../reducers/notificationReducer";
import blogReducer from "../reducers/blogReducer";
import userReducer from "../reducers/userReducer";
import allUsersReducers from "../reducers/allUsersReducers";

import logger from "redux-logger";

const reducer = {
  notification: notificationReducer,
  blogs: blogReducer,
  user: userReducer,
  users: allUsersReducers,
};
const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
