import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdote";

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
  initialState: [],
  reducers: {
    create(state, action) {
      const id = getId();
      state.push({
        ...action.payload,
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
    setAnecdotes(state, action) {
      return action.payload;
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
  },
});
// redux thunk
export const initializeAnecdotes = () => {
  // async fetch data
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    // dispatch different action
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createNew = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.create(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const thunkVote = (id) => {
  return async (dispatch) => {
    const target = await anecdoteService.getOne(id);
    const updated = { ...target, votes: target.votes + 1 };
    await anecdoteService.vote(updated);
    dispatch(vote(updated.id));
  };
};

export const { create, vote, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;
