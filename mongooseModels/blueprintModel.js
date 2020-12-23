const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const blueprintSchema = new Schema({
  name: String,
  leftSide: Number,
  rightSide: Number,
  top: Boolean,
  user: String,
});
module.exports = model("Blueprint", blueprintSchema);
