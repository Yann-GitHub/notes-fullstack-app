// Used to create and populate test-database with initial data /
require("dotenv").config();
const mongoose = require("mongoose");

const url =
  process.env.TEST_MONGODB_URI ||
  (() => {
    if (process.argv.length < 3) {
      console.log("give password as argument or set TEST_MONGODB_URI");
      process.exit(1);
    }
    const password = process.argv[2];
    return `mongodb+srv://ybarlet:${password}@cluster0.8uk7oql.mongodb.net/testNoteApp?retryWrites=true&w=majority`;
  })();

mongoose.set("strictQuery", false);
mongoose
  .connect(url)
  .then(() => {
    const noteSchema = new mongoose.Schema({
      content: String,
      important: Boolean,
    });

    const Note = mongoose.model("Note", noteSchema);

    const notesToAdd = [
      { content: "HTML is Easy", important: true },
      { content: "Browser can execute only JavaScript", important: true },
    ];

    notesToAdd.forEach((noteData) => {
      Note.findOne(noteData).then((existingNote) => {
        if (!existingNote) {
          const note = new Note(noteData);
          note.save().then(() => {
            console.log("note saved!");
            if (notesToAdd.indexOf(noteData) === notesToAdd.length - 1) {
              mongoose.connection.close();
            }
          });
        } else {
          console.log("note already exists!");
          if (notesToAdd.indexOf(noteData) === notesToAdd.length - 1) {
            mongoose.connection.close();
          }
        }
      });
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });
