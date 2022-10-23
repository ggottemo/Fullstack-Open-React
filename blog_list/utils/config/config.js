import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;
const MONGO_URI =
  process.env.MONGO_URI === "test"
    ? process.env.TEST_MONGO_URI
    : process.env.MONGO_URI;

export const SECRET = process.env.SECRET;

export default { PORT, MONGO_URI, SECRET };
