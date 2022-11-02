import React from "react";
import { useDispatch } from "react-redux";
import { create } from "../reducers/anecdoteReducer";
import { clearMessage, updateMessage } from "../reducers/notificationReducer";
import anecdoteService from "../services/anecdote";

const CreateAnecdote = () => {
  const dispatch = useDispatch();
  const addAnecdote = async (e) => {
    e.preventDefault();
    const newAnecdote = await anecdoteService.create(
      e.target.anecdoteContent.value
    );
    dispatch(create(e.target.anecdoteContent.value));
    dispatch(create(newAnecdote));
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
