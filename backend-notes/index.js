require("dotenv").config();
const mongoose = require("mongoose"); //  For MongoDB Atlas connection - ODM

console.log(
  " <<<||-------------------  Wesh papa, ton server est lancé (notes) !  -------------------||>>>"
);

///////////// Exported to the environment variable
// const password = process.argv[2];
// const password = "xxxxxxxxxx"; //avoid to use the password in the command line

///////////// Exported to models/note.js - Externalize mongoose connection
// DO NOT SAVE YOUR PASSWORD TO GITHUB!!
// const url = `mongodb+srv://ybarlet:${password}@cluster0.8uk7oql.mongodb.net/noteApp?retryWrites=true&w=majority`;

// mongoose.set("strictQuery", false); // check if the query is corrsponding to the schema
// mongoose.connect(url);

/////// Exported to models/note.js
// Define a schema for the notes
// const noteSchema = new mongoose.Schema({
//   content: String,
//   important: Boolean,
// });

////// Exported to models/note.js
// Modify the toJSON method of the schema to format the returned object when it is serialized to JSON
// noteSchema.set("toJSON", {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString();
//     delete returnedObject._id;
//     delete returnedObject.__v;
//   },
// });

////// Exported to models/note.js
//const Note = mongoose.model("Note", noteSchema);

///////////////////////////////////////////////////////////////////////////////////////////

//////////////// Ressource - Data mock - not used anymore
// let notes = [
//   { id: 1, content: "HTML is easy", important: true },
//   { id: 2, content: "Browser can execute only JavaScript", important: false },
//   {
//     id: 3,
//     content: "GET and POST are the most important methods of HTTP protocol",
//     important: true,
//   },
// ];

/////////////////////////// With Node.js and without Express !! ///////////////////////////
// const http = require("http");

// const app = http.createServer((request, response) => {
//   response.writeHead(200, { "Content-Type": "application/json" });
//   response.end(JSON.stringify(notes));
// });

// const PORT = 3001;
// app.listen(PORT);
// console.log(`Server running on port ${PORT}`);

//////////////////////////// With Node.js and Express !!  /////////////////////////////////
const express = require("express"); // Import the express library
const app = express(); // Create an instance of the Express application
const Note = require("./models/note"); // Import Mongoose specific code

///////////////////////////// Middleware SECTION
// Define a middleware function that is executed for every incoming request - Similar to `morgan` package
const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:", request.path);
  console.log("Body:", request.body);
  console.log("---");
  next();
};

// Define a middleware function that returns an error message if the request is made to a non-existent route.
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

// Define a middleware function that allows requests from any origin -- CORS (Cross-Origin Resource Sharing)
const cors = require("cors");

// Define middleware that handle errors in a centralized way - Express error handler
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

// Serve static files from the 'dist' directory
app.use(express.static("dist"));

// Middleware that parses the JSON data to javascript object and attaches it to the request object as request.body (deserialization)
app.use(express.json());

// Middleware that logs the request method, path, and body to the console - alternative to morgan package
app.use(requestLogger);

// Middleware that allows requests from any origin -- CORS (Cross-Origin Resource Sharing)
app.use(cors());

///////////////////////////// Route handler SECTION
//////////////Define the 'root' route --  Get a ressource - 200 OK
app.get("/", (request, response) => {
  console.log("root route");
  // console.log(request);
  //console.log(request.headers);
  response.send("<h1>Hello World!</h1>");
});

///////////// Define 'all notes' route -- Get a ressource - 200 OK
// app.get("/api/notes", (request, response) => {
//   response.json(notes);
// });

// Modify handler functions to use the Note model and the MongoDB database
app.get("/api/notes", (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes); // The response.json method sends the notes in the response body in JSON format (serialization)
  });
});

///////////// Define 'single note' route -- Get a ressource - 200 OK or 404 Not Found

// app.get("/api/notes/:id", (request, response) => {
//   const id = Number(request.params.id);
//   //console.log(id);

//   const note = notes.find((note) => note.id === id);

//   //////////////////// Investigate the type problem - note.id is a number and id is a string  /////////////////////
//   // const note = notes.find((note) => {
//   //   console.log(note.id, typeof note.id, id, typeof id, note.id === id);
//   //   return note.id === id;
//   // });
//   // console.log(note);

//   // Managing the error with the status code 404 - Not Found
//   if (note) {
//     response.json(note);
//   } else {
//     response.status(404).end();
//     // response.statusMessage = "Current password does not match";
//   }
//   // response.json(note);
// });

// Modify the handler function to use the Note model and the MongoDB database
// the methode findById is given by Mongoose and returns a promise
// app.get("/api/notes/:id", (request, response) => {
//   Note.findById(request.params.id).then((note) => {
//     response.json(note);
//   });
// });

// Modify the handler to manage the error with the status code 404 - Not Found and 500 - Internal Server Error
// app.get("/api/notes/:id", (request, response) => {
//   Note.findById(request.params.id)
//     .then((note) => {
//       if (note) {
//         response.json(note);
//       } else {
//         response.status(404).end();
//       }
//     })

//     .catch((error) => {
//       console.log(error);
//       // response.status(500).end();
//       response.status(400).send({ error: "malformatted id" });
//       // Error can occur if malformed request syntax, invalid request message framing, or deceptive request routing
//     });
// });

// Modify the handler to send the error to a middleware - Error express error handler
app.get("/api/notes/:id", (request, response, next) => {
  Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

////////////////////// Delete a resource - 204 No Content or 404 Not Found
// app.delete("/api/notes/:id", (request, response) => {
//   const id = Number(request.params.id);
//   notes = notes.filter((note) => note.id !== id);

//   response.status(204).end();
// });

//Modify the handler function to use Mongoose and the MongoDB database
app.delete("/api/notes/:id", (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

/////////////////////////// Add a resource - 200 OK
// app.post("/api/notes", (request, response) => {
//   // 1st way to get the data
//   // const note = request.body;
//   // console.log(note);
//   // console.log(request.headers);
//   // response.json(note);

//   // 2nd way to get the data
//   // const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
//   // const note = request.body;
//   // note.id = maxId + 1;
//   // notes = notes.concat(note);
//   // response.json(note);

//   // 3rd way to get the data
//   const generateId = () => {
//     const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
//     return maxId + 1;
//   };

//   const body = request.body;

//   if (!body.content) {
//     return response.status(400).json({
//       error: "content missing",
//     });
//   }

//   const note = {
//     content: body.content,
//     important: Boolean(body.important) || false,
//     id: generateId(),
//   };

//   notes = notes.concat(note);
//   // create a new array with all notes and the new note (immutability), better than push() methode in this case

//   response.json(note);
// });

//////////////////////// Add a resource - 200 OK - Modify the handler function to use the Note model and the MongoDB database
app.post("/api/notes", (request, response, next) => {
  const body = request.body;

  // Managing the error without error handler middleware
  // if (body.content === undefined) {
  //   return response.status(400).json({ error: "content missing" });
  // }

  // Create a new note with the Note model
  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  note
    .save()
    .then((savedNote) => {
      response.json(savedNote);
    })
    .catch((error) => next(error));
});

//////////////////////// Update a resource (toggle the important setting ) - 200 OK or 404 Not Found
app.put("/api/notes/:id", (request, response, next) => {
  // Viable without validation - 1st way
  //   const body = request.body;

  //   const note = {
  //     content: body.content,
  //     important: body.important,
  //   };

  //   Note.findByIdAndUpdate(request.params.id, note, { new: true })
  //     .then((updatedNote) => {
  //       response.json(updatedNote);
  //     })
  //     .catch((error) => next(error));
  // });

  // Viable with Mongoose validation - 2nd way - validations are not run by default when findOneAndUpdate and related methods
  const { content, important } = request.body;
  Note.findByIdAndUpdate(
    request.params.id,
    { content, important },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
});

//////////////////////////// Middleware
// Define the unknown endpoint middleware - status code 404 (NOT FOUND)
app.use(unknownEndpoint);

// Define the error handler middleware - this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler);

// Define the port where the server will be listening to requests
// For Fly.io and Render we need to use the environment variable process.env.PORT and if it is not defined, we use the port 3001
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
