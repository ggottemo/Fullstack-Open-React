import jwt from "jsonwebtoken";
import User from "../../models/user.js";
import { SECRET } from "../config/config.js";
import Logger from "../logger.js";

const requestLogger = (request, response, next) => {
  Logger.info("Method:", request.method);
  Logger.info("Path:  ", request.path);
  Logger.info("Body:  ", request.body);
  Logger.info("---");
  next();
};
const passwordMasker = (request, response, next) => {
  if (request.body.password) {
    request.body.password = "********";
  }
  next();
};
// Error handling middleware
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  Logger.error(error.message);

  if (error.name === "CastError" && error.kind === "ObjectId") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "invalid token" });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({ error: "token expired" });
  }

  next(error);
};
// Token verification middleware
const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    request.token = authorization.substring(7);
  }
  next();
};
// user extractor middleware
const userExtractor = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  await User.findById(decodedToken.id).exec((err, user) => {
    if (err) {
      throw new Error("User not found");
    }
    request.user = user;
    next();
  });
};
export default {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
  passwordMasker,
};
