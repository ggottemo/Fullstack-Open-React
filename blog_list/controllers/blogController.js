import { Router } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Blog from "../models/blogPost.js";
import User from "../models/user.js";
import { SECRET } from "../utils/config/config.js";

const router = Router();

router.get("/api/blogs", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});
//////////////////////// GET ////////////////////////
router.get("/api/blogs/:id", async (request, response, next) => {
  if (!mongoose.Types.ObjectId.isValid(request.params.id)) {
    response.status(400).send({ error: "malformatted id" });
  } else {
    const blog = await Blog.findById(request.params.id);
    if (blog) {
      response.json(blog);
    } else {
      response.status(404).end();
    }
  }
});
//////////////////////// POST ////////////////////////
router.post("/api/blogs", async (request, response, next) => {
  const { title, author, url, likes } = request.body;
  const decodedToken = jwt.verify(request.token, SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const user = await User.findById(decodedToken.id);
  if (!user) {
    return response.status(401).json({ error: "user not found" });
  }
  if (!title || !url) {
    response.status(400).send({ error: "title or url missing" });
  }
  const blog = new Blog({
    title,
    author,
    url,
    likes: likes || 0,
    user: user,
  });
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog);
});

//////////////////////// DELETE ////////////////////////
router.delete("/api/blogs/:id", async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const user = await User.findById(decodedToken.id);
  if (!user) {
    return response.status(401).json({ error: "user not found" });
  }

  const blog = (await Blog.findById(request.params.id)).toJSON();
  if (blog.user[0]._id.toString() === decodedToken.id.toString()) {
    try {
      await Blog.findByIdAndRemove(request.params.id);
      response.status(204).end();
    } catch (error) {
      next(error);
    }
  } else {
    response.status(401).json({ error: "unauthorized" });
  }
});
//////////////////////// PUT ////////////////////////
// Add like to blog
router.put("/api/blogs/:id", async (request, response, next) => {
  const body = request.body;
  const blog = {
    likes: body.likes,
  };
  if (!mongoose.Types.ObjectId.isValid(request.params.id)) {
    response.status(400).send({ error: "malformatted id" });
  } else {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
    });
    if (updatedBlog) {
      response.json(updatedBlog);
    } else {
      response.status(404).end();
    }
  }
});
export default router;
