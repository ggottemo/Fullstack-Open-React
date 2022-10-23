// app.js
import cors from "cors";
import express from "express";
import "express-async-errors";
import morgan from "morgan";
import blogRouter from "./controllers/blogController.js";
import userRouter from "./controllers/userController.js";
import loginRouter from "./controllers/login.js";
import MIDDLEWARE from "./utils/middleware/middleware.js";
import MONGO from "./utils/mongo.js";
const app = express();
MONGO;

app.use(cors());
app.use(express.json());
if (!process.env.NODE_ENV === "test") {
  app.use(morgan("tiny"));
}
app.use(MIDDLEWARE.tokenExtractor);
app.use(MIDDLEWARE.requestLogger);
// Routers
app.use(blogRouter);
app.use(userRouter);
app.use(loginRouter);
app.use(MIDDLEWARE.unknownEndpoint);
app.use(MIDDLEWARE.errorHandler);
export default app;
