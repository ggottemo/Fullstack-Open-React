import { Router } from "express";

const router = Router();

router.get("/api/users", async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

router.post("/api/users", async (request, response) => {
  const body = request.body;
  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash: body.passwordHash,
  });
  const savedUser = await user.save();
  response.json(savedUser);
});

// TODO: Add routes here
