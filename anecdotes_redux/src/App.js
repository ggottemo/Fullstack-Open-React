import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Anecdotes from "./components/Anecdotes.js";
import CreateAnecdote from "./components/CreateAnecdote.js";
import Filter from "./components/Filter.js";
import NotificationArea from "./components/NotificationArea.js";
import { initializeAnecdotes } from "./reducers/anecdoteReducer.js";
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeAnecdotes());
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
