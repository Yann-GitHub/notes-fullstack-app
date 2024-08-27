// Controller module for the notes route. Contains the buisness logic.
// The module exports the router to be available for all consumers of the module.
// The router is then used in the main application module (app.js) to define the routes for the application.
// The router is in fact a middleware, that can be used for defining "related routes" in a single place, which is typically placed in its own module.

const jwt = require("jsonwebtoken");
const notesRouter = require("express").Router();
const Note = require("../models/note");
const User = require("../models/user");

// Helper function to extract the token from the request header
const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.replace("bearer ", "");
  }
  return null;
};

// notesRouter.get("/", (request, response) => {
//   Note.find({}).then((notes) => {
//     response.json(notes);
//   });
// });

// First refacto with async/await
notesRouter.get("/", async (request, response) => {
  const notes = await Note.find({}).populate("user", {
    username: 1,
    name: 1,
  });
  response.json(notes);
});

notesRouter.get("/:id", async (request, response, next) => {
  try {
    const note = await Note.findById(request.params.id);
    if (note) {
      response.json(note);
    } else {
      response.status(404).end();
    }
  } catch (exception) {
    next(exception);
  }
});

notesRouter.post("/", async (request, response, next) => {
  const body = request.body;
  console.log("body", body);
  console.log("eerrererererererrer");

  // Check if the token is valid and extract the object from the token
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }

  const user = await User.findById(decodedToken.id);
  // const user = await User.findById(body.user);

  const note = new Note({
    content: body.content,
    // important: body.important || false,
    important: body.important === undefined ? false : body.important,
    user: user.id,
  });

  try {
    const savedNote = await note.save();
    user.notes = user.notes.concat(savedNote._id);
    await user.save();

    response.status(201).json(savedNote);
  } catch (exception) {
    next(exception);
  }
});

notesRouter.delete("/:id", async (request, response, next) => {
  try {
    await Note.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (exception) {
    next(exception);
  }
});

// notesRouter.put("/:id", (request, response, next) => {
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

notesRouter.put("/:id", async (request, response, next) => {
  const body = request.body;

  const note = {
    content: body.content,
    important: body.important,
  };

  try {
    const updatedNote = await Note.findByIdAndUpdate(request.params.id, note, {
      new: true,
    });
    response.json(updatedNote);
  } catch (exception) {
    next(exception);
  }
});

module.exports = notesRouter;
