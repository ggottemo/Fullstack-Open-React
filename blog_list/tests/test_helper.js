const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "https://www.researchgate.net/publication/220491331",
    likes: 5,
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "https://www.researchgate.net/publication/220491331",
    likes: 12,
  },
];

const clearDb = async () => {
  await Blog.deleteMany({});
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
  return blogs.map((blog) => blog.toJSON());
};

const setupDB = async () => {
  await clearDb();
  await Blog.insertMany(initialBlogs);
};

export { initialBlogs, nonExistingId, blogsInDb, clearDb, setupDB };
