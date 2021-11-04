const { model, Schema } = require("Mongoose");

const UserSchema = Schema({
  username: { type: String, unique: true },
  password: { type: String },
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
});

module.exports = model("User", UserSchema);
