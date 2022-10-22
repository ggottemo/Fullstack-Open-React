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
    id: "5a422a851b54a676234d17f7",
    name: "Superuser",
    password: "sekret",
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
const createTenSampleBlogs = async () => {
  const blogs = [];
  const tempUser = await User.findOne({});
  await clearUserBlogs(tempUser);
  for (let i = 0; i < 10; i++) {
    const blog = new Blog({
      title: `title${i}`,
      author: `author${i}`,
      url: `url${i}`,
      likes: i,
      user: tempUser.id,
    });
    blogs.push(blog);
  }
  await Blog.insertMany(blogs);
  await User.findOneAndUpdate(
    { id: tempUser.id },
    { blogs: blogs.map((blog) => blog.id) }
  );
};
/////////////////////// USERS ////////////////////////
const usersInDb = async () => {
  const users = await User.find({});
  return Promise.all(users.map((user) => user.toJSON()));
};
// Get user
const getUser = async () => {
  const user = await User.findOne({});
  return user;
};

const clearUserBlogs = async (user) => {
  await Blog.deleteMany({ user: user.id });
  await User.findOneAndUpdate({ id: user.id }, { blogs: [] });
};

const insertAndReturnUser = async () => {
  const user = new User({
    username: "testuser",
    name: "testuser",
    password: "testuser",
  });
  await user.save();
  return user;
};

export default {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  clearDb,
  setupDB,
  usersInDb,
  initialUsers,
  getUser,
  createTenSampleBlogs,
};
