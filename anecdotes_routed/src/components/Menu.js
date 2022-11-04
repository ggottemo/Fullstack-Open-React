import React, { useState } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import About from "../pages/About.js";
import AnecdoteList from "../pages/AnecdoteList.js";
import CreateNew from "../pages/CreateNew.js";

const Menu = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ]);
  const padding = {
    paddingRight: 5,
  };

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  return (
    <div>
      <nav>
        <li>
          <NavLink style={padding} to={"About"} activeclassname="active">
            {" "}
            About{" "}
          </NavLink>
        </li>
        <li>
          <NavLink to="CreateNew" activeclassname="active">
            {" "}
            Create New
          </NavLink>
        </li>
        <li>
          <NavLink to="/" activeclassname="active">
            {" "}
            Anecdotes{" "}
          </NavLink>
        </li>
      </nav>
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/create" element={<CreateNew addNew={addNew} />} />
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
      </Routes>
    </div>
  );
};

export default Menu;
