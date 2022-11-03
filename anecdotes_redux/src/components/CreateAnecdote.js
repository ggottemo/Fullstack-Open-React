import React from "react";
import { connect, useDispatch } from "react-redux";
import { createNew } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const CreateAnecdote = (props) => {
  const dispatch = useDispatch();
  const addAnecdote = async (e) => {
    e.preventDefault();

    props.createNew(e.target.anecdoteContent.value);

    const msg = `Created anecdote: ${e.target.anecdoteContent.value}`;
    props.setNotification(msg, 3000);
  };

  return (
    <div>
      <h2>Add New</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdoteContent" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    state: state,
  };
};

const mapDispatchToProps = {
  createNew,
  setNotification,
};

const ConnectedCreateAnecdote = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateAnecdote);

export default ConnectedCreateAnecdote;
