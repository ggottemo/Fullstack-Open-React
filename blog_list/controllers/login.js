import bcrypt from "bcrypt";
import { Router } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { SECRET, SECRET_EXPIRES_IN } from "../utils/config/config.js";

const router = Router();

// POST /api/login
router.post("/api/login", async (request, response) => {
  const { username, password } = request.body;
  await User.findOne({ username }).exec((err, user) => {
    if (err) throw err;
    user.populate("blogs");
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
          const token = jwt.sign(userForToken, SECRET, {
            expiresIn: SECRET_EXPIRES_IN,
          });
          response.status(200).send({
            token,
            username: user.username,
            name: user.name,
            blogs: user.blogs,
          });
        } else {
          response.status(401).send({ error: "invalid password" });
        }
      });
    }
  });
});

export default router;
