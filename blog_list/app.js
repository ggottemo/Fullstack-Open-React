// app.js
import cors from "cors";
import express from "express";
import morgan from "morgan";
import blogRouter from "./controllers/blogController.js";
import MIDDLEWARE from "./utils/middleware/middleware.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(MIDDLEWARE.requestLogger);

app.use("/api/blogs", blogRouter);

app.use(MIDDLEWARE.errorHandler);
app.use(MIDDLEWARE.unknownEndpoint);
export default app;
