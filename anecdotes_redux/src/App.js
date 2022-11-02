import Anecdotes from "./components/Anecdotes.js";
import CreateAnecdote from "./components/CreateAnecdote.js";
import Filter from "./components/Filter.js";
import NotificationArea from "./components/NotificationArea.js";

const App = () => {
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
