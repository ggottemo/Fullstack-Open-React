import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import { clearMessage, updateMessage } from "../reducers/notificationReducer";

const Anecdotes = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button
                onClick={() => {
                  dispatch(vote(anecdote.id)) &&
                    dispatch(updateMessage("Voted for anecdote!"));
                  setTimeout(() => {
                    dispatch(clearMessage("Voted for anecdote!"));
                  }, 3000);
                }}
              >
                vote
              </button>
            </div>
          </div>
        ))
        .sort((a, b) => b.votes - a.votes)}
    </div>
  );
};

export default Anecdotes;
