import { createSlice } from "@redux/toolkit";

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
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

export const vote = (content) => {
  return {
    type: "VOTE",
    data: {
      id: content,
    },
  };
};

const initialState = anecdotesAtStart.map(asObject);

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    create(state, action) {
      const content = action.payload;
      state.push({
        content,
        id: getId(),
        votes: 0,
      });
    },
    vote(state, action) {
      const id = action.payload;
      const targetAnecdote = state.find((n) => n.id === id);
      const updatedAnecdote = {
        ...targetAnecdote,
        likes: targetAnecdote.likes + 1,
      };
      return state.map((anecdote) =>
        anecdote.id === id ? updatedAnecdote : anecdote
      );
    },
  },
});

const reducer = (state = initialState, action) => {
  console.log("state now: ", state);
  console.log("action", action);

  switch (action.type) {
    case "VOTE":
      return state.map((anecdote) =>
        anecdote.id !== action.data.id
          ? anecdote
          : { ...anecdote, votes: anecdote.votes + 1 }
      );
    case "CREATE":
      return [...state, action.data];

    default:
      return state;
  }
};

export default reducer;
