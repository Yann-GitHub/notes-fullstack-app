//////  Now than we have interaction with the database, we can connct the backend to the database and evantually remove the following lines

const mongoose = require("mongoose"); // ODM (Object Data Modeling) library for MongoDB and Node.js

// Check if the password is provided as an argument
// This methode is an alternative to environment variables (process.env)
if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

// Get the password from the command line
const password = process.argv[2];

// Connection URL - MongoDB Atlas
const url = `mongodb+srv://ybarlet:${password}@cluster0.8uk7oql.mongodb.net/noteApp?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

// Define a schema for the notes
const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

// Define a model for the notes - same as a collection in MongoDB
const Note = mongoose.model("Note", noteSchema);

// Create a new note
const note = new Note({
  content: "HTML is Easy",
  important: true,
});

const note2 = new Note({
  content: "Browser can execute only JavaScript",
  important: false,
});

const note3 = new Note({
  content: "GET and POST are the most important methods of HTTP protocol",
  important: true,
});

// Save one note to the database
// note.save().then((result) => {
//   console.log("note saved!");
//   mongoose.connection.close();
// });

// Save multiple notes to the database
// Promise.all([note2.save(), note3.save()])
//   .then((results) => {
//     console.log("all notes saved!");
//     mongoose.connection.close();
//   })
//   .catch((error) => {
//     console.log("error saving notes:", error);
//   });

// Fetch all notes from the database
// Note.find({}).then((result) => {
//   result.forEach((note) => {
//     console.log(note);
//   });
//   mongoose.connection.close();
// });

// Fetch only the important notes from the database
Note.find({ important: true }).then((result) => {
  result.forEach((note) => {
    console.log(note);
  });
  mongoose.connection.close();
});
