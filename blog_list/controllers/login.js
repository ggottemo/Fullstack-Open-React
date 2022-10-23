import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Router } from "express";
import User from "../models/user.js";
import { SECRET } from "../utils/config/config.js";

const router = Router();

// POST /api/login
router.post("/api/login", async (request, response) => {
  const { username, password } = request.body;
  await User.findOne({ username }).exec((err, user) => {
    if (err) throw err;
    if (!user) {
      response.status(401).send({ error: "invalid username" });
    } else {
      bcrypt.compare(password, user.passwordHash, (err, result) => {
        if (err) throw err;
        if (result) {
          const userForToken = {
            username: user.username,
            id: user._id,
          };
          const token = jwt.sign(userForToken, SECRET, { expiresIn: 60 * 60 });
          response
            .status(200)
            .send({ token, username: user.username, name: user.name });
        } else {
          response.status(401).send({ error: "invalid password" });
        }
      });
    }
  });
});

export default router;
