import React from "react";
import { useDispatch } from "react-redux";
import { createNew } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const CreateAnecdote = () => {
  const dispatch = useDispatch();
  const addAnecdote = async (e) => {
    e.preventDefault();

    dispatch(createNew(e.target.anecdoteContent.value));

    const msg = `Created anecdote: ${e.target.anecdoteContent.value}`;
    dispatch(setNotification(msg, 3000));
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
