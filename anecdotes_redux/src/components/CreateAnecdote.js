import React from "react";
import { useDispatch } from "react-redux";
import { create } from "../reducers/anecdoteReducer";

const CreateAnecdote = () => {
  const dispatch = useDispatch();
  const addAnecdote = (e) => {
    e.preventDefault();
    dispatch(create(e.target.anecdoteContent.value));
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
