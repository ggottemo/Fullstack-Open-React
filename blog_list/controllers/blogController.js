import { Router } from "express";
import mongoose from "mongoose";
import Blog from "../models/blogPost.js";

const router = Router();

router.get("/api/blogs", async (request, response) => {
  const blogs = await Blog.find({});
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
router.post("/api/blogs", async (request, response) => {
  const blog = new Blog(request.body);

  if (!blog.title || !blog.url) {
    response.status(400).end();
  } else {
    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
  }
});

//////////////////////// DELETE ////////////////////////
router.delete("/api/blogs/:id", async (request, response, next) => {
  if (!mongoose.Types.ObjectId.isValid(request.params.id)) {
    response.status(400).send({ error: "malformatted id" });
  } else {
    await Blog.findByIdAndRemove(request.params.id);
  }
});
export default router;
