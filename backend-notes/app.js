const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const notesRouter = require("./controllers/notes");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
// const testingRouter = require("./controllers/testing");

const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false); // Disable the strict query mode - allows to use the find method without a query object

logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connection to MongoDB:", error.message);
  });

app.use(cors()); // Middleware function that allows requests from any origin -- CORS (Cross-Origin Resource Sharing)
app.use(express.static("dist")); // Middleware function that serves static files from the dist directory
app.use(express.json()); // Middleware function that parses incoming requests with JSON payloads
app.use(middleware.requestLogger); // Middleware function that logs the request method, path, and body to the console

app.use("/api/notes", notesRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}

app.use(middleware.unknownEndpoint); // Middleware function that returns an error message if the request is made to a non-existent route
app.use(middleware.errorHandler); // Middleware function that handles errors in a centralized way

module.exports = app;
