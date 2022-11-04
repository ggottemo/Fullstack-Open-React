import React from "react";
import { Link } from "react-router-dom";

const AnecdoteList = ({ anecdotes }) => {
  return (
    <div style={style}>
      <h2 style={header}>Anecdotes</h2>
      <ul style={listStyle}>
        {anecdotes.map((anecdote) => (
          <li key={anecdote.id}>
            <Link to={`/anecdotes/${anecdote.id}`} style={anecdoteSty}>
              {anecdote.content}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const header = {
  fontSize: "1.5em",
  textAlign: "center",
  fontFamily: "Papyrus",
};

const anecdoteSty = {
  fontSize: "1.5em",
  fontFamily: "Arial",
};

const listStyle = {
  listStyleType: "none",
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-evenly",
};

const style = {
  border: "5px dotted orange",
  margin: "10px 10px 10px 10px",
};
export default AnecdoteList;
