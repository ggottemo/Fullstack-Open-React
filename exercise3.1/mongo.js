import mongoose from "mongoose";

if (process.argv.length < 3) {
  console.log(
    "Please provide thee password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}
// Password and connection string
const password = process.argv[2];
const url = `mongodb://admin:${password}@audradminsrv:27017/gggottem?authMechanism=DEFAULT&authSource=admin`;
// DB Schema
const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Contact = mongoose.model("Contact", contactSchema);
const newName = process.argv[3];
const newNumber = process.argv[4];
mongoose
  .connect(url)
  .then((result) => {
    console.log("connected");
  })
  .then(() => {
    console.log(process.argv.length);
    if (process.argv.length == 3) {
      console.log("Phonebook: ");
      Contact.find({}).then((result) => {
        console.log("result", result);
        result.forEach((contact) => {
          console.log(`${contact.name} ${contact.number}`);
        });
        return mongoose.connection.close();
      });
    } else {
      const contact = new Contact({
        name: newName,
        number: newNumber,
      });
      return contact.save().then((result) => {
        console.log(`added ${newName} number ${newNumber} to the phonebook`);
        return mongoose.connection.close();
      });
    }
  })
  .catch((err) => console.error(err));
