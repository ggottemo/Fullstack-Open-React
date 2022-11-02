const Notification = ({ message }) => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };

  if (message.message.length > 0) {
    return (
      <div style={style} key={message.id}>
        {" "}
        {message.message}{" "}
      </div>
    );
  } else return " ";
};

export default Notification;
