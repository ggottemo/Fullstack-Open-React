import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import store from "./app/store.js";
import router from "./app/router";
import { RouterProvider } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
