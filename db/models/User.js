const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: { type: String, unique: true },
  password: { type: String },
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
});

module.exports = mongoose.model("User", UserSchema);
