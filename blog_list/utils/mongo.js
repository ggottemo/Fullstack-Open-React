import mongoose from "mongoose";
import Config from "./config/config.js";
import logger from "./logger.js";

export default mongoose
  .connect(Config.MONGO_URI)
  .then(() => {
    logger.info("Connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB", error);
  });
