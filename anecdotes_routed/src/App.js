import { useState } from "react";

import Footer from "./components/Footer.js";
import Menu from "./components/Menu.js";

const App = () => {
  const [notification, setNotification] = useState("");

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Footer />
    </div>
  );
};

export default App;
