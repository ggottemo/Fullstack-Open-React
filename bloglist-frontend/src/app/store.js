import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "../reducers/notificationReducer";
import logger from "redux-logger";

const reducer = {
  notification: notificationReducer,
};
const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
