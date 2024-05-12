// Extract the Mongoose specific code to its own module, and export/import to index.js
// The module exports a Mongoose model, which is then imported and used in the main application file, index.js.

const mongoose = require("mongoose"); // ODM (Object Data Modeling) library for MongoDB and Node.js

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;
console.log("connecting to", url);

// Connect to the database
mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

// Define a schema for the notes - without validation
// const noteSchema = new mongoose.Schema({
//   content: String,
//   important: Boolean,
// });

// Define a schema for the notes - with validation
const noteSchema = new mongoose.Schema({
  content: { type: String, minLength: 5, required: true },
  important: Boolean,
});

// Modify the toJSON method of the schema to format the returned object when it is serialized to JSON
noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Note", noteSchema);
// The module exports the Note model
// Other things like variables and url will not be accessible from outside the module
