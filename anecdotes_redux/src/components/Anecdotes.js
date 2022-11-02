import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkVote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

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
                  dispatch(thunkVote(anecdote.id));
                  dispatch(
                    setNotification(`You voted for ${anecdote.content}`, 3000)
                  );
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
