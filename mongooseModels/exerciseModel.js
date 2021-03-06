const mongoose = require("mongoose");
const { Schema, model } = mongoose;
var random = require("mongoose-simple-random");

const exerciseSchema = new Schema({
  blueprint: {
    name: String,
    leftSide: Number,
    rightSide: Number,
    top: Boolean,
  },
  exercise: {
    name: String,
    top: String,
    leftSide: [
      {
        ratio: String,
        value: String,
        index: Number,
      },
    ],
    rightSide: [
      {
        ratio: String,
        value: String,
        index: Number,
      },
    ],
  },
  user: String,
});
exerciseSchema.plugin(random);
module.exports = model("Exercise", exerciseSchema);
