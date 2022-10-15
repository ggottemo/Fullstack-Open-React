import mongoose from "mongoose";
import { MONGO_URI } from "./config/config.js";

export default mongoose.connect(MONGO_URI).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("error connecting to MongoDB", error);
});