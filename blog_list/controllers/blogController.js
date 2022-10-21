import { Router } from "express";

import Blog from "../models/blogPost.js";
import logger from "../utils/logger.js";

const router = Router();

router.get("/api/blogs", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.status(200).json(blogs);
  });
});

router.get("/api/blogs/:id", (request, response, next) => {
  if (!mongoose.Types.ObjectId.isValid(request.params.id)) {
    response.status(400).send({ error: "malformatted id" });
  } else {
    Blog.findById(request.params.id)
      .then((blog) => {
        if (blog) {
          response.status(200).json(blog);
        } else {
          response.status(404).end();
        }
      })
      .catch((error) => next(error));
  }
});
router.post("/api/blogs", (request, response) => {
  const blog = new Blog(request.body);

  blog
    .save()
    .then((result) => {
      response.status(201).json(result);
    })
    .catch((error) => logger.error(error));
});

export default router;
