import { Router } from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";
const router = Router();

router.get("/api/users", async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

router.post("/api/users", async (request, response) => {
  const { username, name, password } = request.body;
  if (!username || !password) {
    response.status(400).send({ error: "username or password missing" });
  }
  if (username.length < 3 || password.length < 3) {
    response.status(400).send({ error: "username or password too short" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();
  response.status(201).json(savedUser);
});

export default router;
