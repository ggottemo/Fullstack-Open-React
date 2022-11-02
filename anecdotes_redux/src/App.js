import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Anecdotes from "./components/Anecdotes.js";
import CreateAnecdote from "./components/CreateAnecdote.js";
import Filter from "./components/Filter.js";
import NotificationArea from "./components/NotificationArea.js";
import { setAnecdotes } from "./reducers/anecdoteReducer.js";
import anecdoteService from "./services/anecdote.js";
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    anecdoteService
      .getAll()
      .then((anecdotes) => dispatch(setAnecdotes(anecdotes)));
  }, [dispatch]);

  return (
    <div>
      <NotificationArea />
      <Filter />
      <Anecdotes />
      <CreateAnecdote />
    </div>
  );
};

export default App;
