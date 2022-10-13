import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const url = process.env.MONGODB_URI;

console.log("connecting to ", url);

mongoose
  .connect(url)
  .then((result) => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("error connecting to MongoDB", error);
  });

const contactSchema = new mongoose.Schema({
  id: String,
  name: String,
  number: String,
});
// Remove id and version info
contactSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default mongoose.model("Contact", contactSchema);
