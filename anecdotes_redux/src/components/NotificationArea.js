import React from "react";
import { useSelector } from "react-redux";
import Notification from "./Notification";

const NotificationArea = () => {
  const notifications = useSelector((state) => state.notifications);

  return notifications.map((notification) => (
    <Notification key={notification.id} message={notification.message} />
  ));
};

export default NotificationArea;
