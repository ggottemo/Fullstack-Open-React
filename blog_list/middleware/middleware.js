import Logger from "../utils/logger.js";

const requestLogger = (request, response, next) => {
    Logger.info("Method:", request.method);
    Logger.info("Path:  ", request.path);
    Logger.info("Body:  ", request.body);
    Logger.info("---");
    next();
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" });
}

const errorHandler = (error, request, response, next) => {
    Logger.error(error.message);

    if (error.name === "CastError" && error.kind === "ObjectId") {
        return response.status(400).send({ error: "malformatted id" });
    } else if (error.name === "ValidationError") {
        return response.status(400).json({ error: error.message });
    }

    next(error);
}

export default {
    requestLogger,
    unknownEndpoint,
    errorHandler
}