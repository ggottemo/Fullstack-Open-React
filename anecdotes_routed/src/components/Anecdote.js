import React from "react";

const Anecdote = ({ anecdote }) => {
  const { content, info, author, votes, id } = anecdote;
  return (
    <div>
      <h3>
        #{id} {content}
      </h3>
      <p>
        Likes: {votes} Author: {author}{" "}
      </p>
      <a href={info}>Click for more info!</a>
    </div>
  );
};

export default Anecdote;
