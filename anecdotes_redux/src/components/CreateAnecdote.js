import React from "react";
import { useDispatch } from "react-redux";
import { create } from "../reducers/anecdoteReducer";
import { clearMessage, updateMessage } from "../reducers/notificationReducer";

const CreateAnecdote = () => {
  const dispatch = useDispatch();
  const addAnecdote = (e) => {
    e.preventDefault();
    dispatch(create(e.target.anecdoteContent.value));
    const msg = `Created anecdote: ${e.target.anecdoteContent.value}`;
    dispatch(updateMessage(msg));
    setTimeout(() => {
      dispatch(clearMessage(msg));
    }, 3000);
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

export default CreateAnecdote;
