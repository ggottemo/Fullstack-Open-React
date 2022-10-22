import { Router } from "express";
import mongoose from "mongoose";
import Blog from "../models/blogPost.js";
import User from "../models/user.js";

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
    if (blog.user) {
      await User.findOne({}).exec(async (err, user) => {
        if (err) {
          throw err;
        }
        blog.user = user._id;
        const savedBlog = await blog.save();
        user.blogs = user.blogs.concat(savedBlog._id);
        await user.save();
        response.status(201).json(savedBlog);
      });
    } else {
      await blog.save();
      response.status(201).json(blog);
    }
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
