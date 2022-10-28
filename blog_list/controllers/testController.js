// test api

import { Router } from "express";
import Blog from "../models/blogPost.js";
import User from "../models/user.js";

const router = Router();

router.post("/", async (req, res) => {
  const { username, name, password } = req.body;

  const user = new User({
    username,
    name,
    password,
  });

  const savedUser = await user.save();

  res.json(savedUser);
});

// Reset
router.post("/api/testing/reset", async (req, res) => {
  await User.deleteMany({});
  await Blog.deleteMany({});
  res.status(204).end();
});

// Populate with test data
router.post("/api/testing/populate", async (req, res) => {
  const users = [
    {
      username: "testuser",
      name: "Test User",
      password: "testpassword",
    },
    {
      username: "testuser2",
      name: "Test User 2",
      password: "testpassword2",
    },
  ];
  await User.insertMany(users);
  res.status(204).end();
});

// Get all users
router.get("/api/testing/", async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

export default router;
