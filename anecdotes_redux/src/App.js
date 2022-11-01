import { useDispatch, useSelector } from "react-redux";
import { create, vote } from "./reducers/anecdoteReducer.js";

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  anecdotes.sort((a, b) => b.votes - a.votes);

  const addAnecdote = (e) => {
    e.preventDefault();
    dispatch(create(e.target.anecdoteContent.value));
  };
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdoteContent" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default App;
