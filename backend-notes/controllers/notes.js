// Controller module for the notes route. Contains the buisness logic for the notes route.
// The module exports the router to be available for all consumers of the module.
// The router is then used in the main application module (app.js) to define the routes for the application.
// The router is in fact a middleware, that can be used for defining "related routes" in a single place, which is typically placed in its own module.

const notesRouter = require("express").Router();
const Note = require("../models/note");

// notesRouter.get("/", (request, response) => {
//   Note.find({}).then((notes) => {
//     response.json(notes);
//   });
// });
// First refacto with async/await
notesRouter.get("/", async (request, response) => {
  const notes = await Note.find({});
  response.json(notes);
});

// notesRouter.get("/:id", (request, response, next) => {
//   Note.findById(request.params.id)
//     .then((note) => {
//       if (note) {
//         response.json(note);
//       } else {
//         response.status(404).end();
//       }
//     })
//     .catch((error) => next(error));
// });

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

// notesRouter.post("/", (request, response, next) => {
//   const body = request.body;

//   const note = new Note({
//     content: body.content,
//     important: body.important || false,
//   });

//   note
//     .save()
//     .then((savedNote) => {
//       response.status(201).json(savedNote);
//     })
//     .catch((error) => next(error));
// });

notesRouter.post("/", async (request, response, next) => {
  const body = request.body;

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  try {
    const savedNote = await note.save();
    response.status(201).json(savedNote);
  } catch (exception) {
    next(exception);
  }
});

// notesRouter.delete("/:id", (request, response, next) => {
//   Note.findByIdAndDelete(request.params.id)
//     .then(() => {
//       response.status(204).end();
//     })
//     .catch((error) => next(error));
// });

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
