// Extracted logging into a separate module is a good practice, as it allows for easy modification of the logging behavior in the future.
// For example, you could add timestamps to the log messages, or send them to a logging service like Loggly or Papertrail.

// const info = (...params) => {
//   console.log(...params);
// };

// const error = (...params) => {
//   console.error(...params);
// };

// The middleware that outputs information about the HTTP requests is obstructing the test execution output.
// Modify to not print console.log in test mode:
const info = (...params) => {
  if (process.env.NODE_ENV !== "test") {
    console.log(...params);
  }
};

const error = (...params) => {
  if (process.env.NODE_ENV !== "test") {
    console.error(...params);
  }
};

module.exports = {
  info,
  error,
};
