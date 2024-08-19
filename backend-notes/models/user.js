// Used for data modeling, validation and buisness logic
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  //   username: String,
  username: {
    type: String,
    required: true,
    unique: true, // this ensures the uniqueness of username
  },
  name: String,
  passwordHash: String,
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Note",
    },
  ],
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash; // the passwordHash should not be revealed
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

// module.exports = mongoose.model("User", userSchema);
