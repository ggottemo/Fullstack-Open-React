import Anecdotes from "./components/Anecdotes.js";
import CreateAnecdote from "./components/CreateAnecdote.js";
import NotificationArea from "./components/NotificationArea.js";

const App = () => {
  return (
    <div>
      <NotificationArea />
      <Anecdotes />
      <CreateAnecdote />
    </div>
  );
};

export default App;
