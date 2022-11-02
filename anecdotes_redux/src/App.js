import Anecdotes from "./components/Anecdotes.js";
import CreateAnecdote from "./components/CreateAnecdote.js";
import Notification from "./components/Notification.js";

const App = () => {
  return (
    <div>
      <Notification />
      <Anecdotes />
      <CreateAnecdote />
    </div>
  );
};

export default App;
