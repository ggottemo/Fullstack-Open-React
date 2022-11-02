import { createSlice } from "@reduxjs/toolkit";

const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  const id = getId();
  return {
    content: anecdote,
    id,
    votes: 0,
    user: id % 2 === 0 ? "First User" : "Second User",
  };
};

const initialState = anecdotesAtStart.map(asObject);

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    create(state, action) {
      const content = action.payload;
      const id = getId();
      state.push({
        content,
        id,
        votes: 0,
        user: id % 2 === 0 ? "First User" : "Second User",
      });
    },
    vote(state, action) {
      const id = action.payload;
      const targetAnecdote = state.find((n) => n.id === id);
      const updatedAnecdote = {
        ...targetAnecdote,
        votes: targetAnecdote.votes + 1,
      };
      return state.map((anecdote) =>
        anecdote.id === id ? updatedAnecdote : anecdote
      );
    },
  },
});

export const { create, vote } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
