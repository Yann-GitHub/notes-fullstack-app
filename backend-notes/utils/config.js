require("dotenv").config();

// Extract the configuration to its own module and export/import to other modules
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

module.exports = {
  MONGODB_URI,
  PORT,
};
