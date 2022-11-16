import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
  axios.defaults.headers.common["Authorization"] = token;
};
// GET /api/blogs

const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};
const getAll = async () => {
  const request = axios.get(baseUrl);
  const response = await request;
  return response.data;
};

// POST /api/blogs
const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

// PUT /api/blogs/:id (update)
const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(`${baseUrl}/${id}`, newObject, config);
  return response.data;
};

// DELETE /api/blogs/:id
const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

// Export
const blogService = {
  getAll,
  getOne,
  create,
  setToken,
  update,
  remove,
};
export default blogService;
