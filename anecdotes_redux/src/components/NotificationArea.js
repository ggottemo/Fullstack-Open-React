import React from "react";
import { connect } from "react-redux";
import Notification from "./Notification";

const NotificationArea = (props) => {
  return props.notifications.map((notification) => (
    <Notification key={notification.id} message={notification.message} />
  ));
};

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications,
  };
};

const ConnectedNotificationArea = connect(mapStateToProps)(NotificationArea);
export default ConnectedNotificationArea;
