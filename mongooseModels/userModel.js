const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: String,
  password: String,
  email: String,
});
module.exports = model("User", userSchema);
