import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import { clearMessage, updateMessage } from "../reducers/notificationReducer";
import anecdoteService from "../services/anecdote";

const Anecdotes = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter);

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes
        .filter((x) =>
          x.user
            .toString()
            .toLowerCase()
            .includes(filter.toString().toLowerCase())
        )
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button
                onClick={async () => {
                  await anecdoteService.vote(anecdote);
                  dispatch(vote(anecdote.id));
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
        ))}
    </div>
  );
};

export default Anecdotes;
