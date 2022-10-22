import Blog from "../models/blogPost.js";
import MONGO from "../utils/mongo.js";
import User from "../models/user.js";
MONGO;
const initialBlogs = [
  {
    id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "https://www.researchgate.net/publication/220491331",
    likes: 5,
  },
  {
    id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "https://www.researchgate.net/publication/220491331",
    likes: 12,
  },
];
const initialUsers = [
  {
    username: "root",
  },
];
/////////////////////// BLOGS ////////////////////////
const clearDb = async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});
};

const nonExistingId = async () => {
  const blog = new Blog({
    title: "willremovethissoon",
    author: "willremovethissoon",
  });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return Promise.all(blogs.map((blog) => blog.toJSON()));
};

const setupDB = async () => {
  await clearDb();
  await Blog.insertMany(initialBlogs);
  await User.insertMany(initialUsers);
};
/////////////////////// USERS ////////////////////////
const usersInDb = async () => {
  const users = await User.find({});
  return Promise.all(users.map((user) => user.toJSON()));
};

export default {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  clearDb,
  setupDB,
  usersInDb,
  initialUsers,
};
