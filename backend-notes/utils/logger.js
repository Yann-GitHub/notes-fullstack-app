// Extracted logging into a separate module is a good practice, as it allows for easy modification of the logging behavior in the future.
// For example, you could add timestamps to the log messages, or send them to a logging service like Loggly or Papertrail.

const info = (...params) => {
  console.log(...params);
};

const error = (...params) => {
  console.error(...params);
};

module.exports = {
  info,
  error,
};
