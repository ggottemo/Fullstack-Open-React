import axios from "axios";

const baseURL = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseURL);
  return response.data;
};

const create = async (content) => {
  const object = { content, votes: 0, user: "First User" };
  const response = await axios.post(baseURL, object);
  return response.data;
};

const vote = async (anecdote) => {
  const newVotes = anecdote.votes + 1;
  const response = await axios.put(`${baseURL}\\${anecdote.id}`, {
    ...anecdote,
    votes: newVotes,
  });
  return response.data;
};

export default { getAll, create, vote };
