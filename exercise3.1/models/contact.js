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
  id: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: 3,
    },
    number: {
        type: String,
        required: [true, "Number is required"],
        minlength: 8,
        validate: {
            validator: function (v) {
                return /\d{3}-\d{3}-\d{4}/.test(v);
            },
            message: (props) => `${props.value} is not a valid phone number!`,
        }
    },
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
