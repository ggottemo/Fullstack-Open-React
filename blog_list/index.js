import http from "http";
import app from "./app.js";
import Config from "./utils/config/config.js";
import logger from "./utils/logger.js";

const server = http.createServer(app);

server.listen(Config.PORT, () => {
  logger.info(`Server running on port ${Config.PORT}`);
});
