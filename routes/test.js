const express = require("express");
const router = express.Router();
const Exercise = require("../mongooseModels/exerciseModel");
const authMiddleware = require("../middleware/authMiddleware");
const _ = require("lodash");
// @route GET api/test
// @desc  Get one random exercise and send test exercise
// @access Private
router.get("/", authMiddleware, async (req, res) => {
  try {
    const exercises = await Exercise.find({
      user: req.user.id,
    });
    const randomNum = Math.floor(Math.random() * exercises.length);
    const randomExercise = exercises[randomNum];
    console.log(randomExercise._id);
    res.json(randomExercise);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
});
// @route POST api/blueprints
// @desc  Add new blueprint
// @access Private
router.post("/", authMiddleware, async (req, res) => {
  const exerciseFromUser = {
    top: req.body.top,
    leftSide: req.body.leftSide
      .map((e) => {
        return _.pick(e, ["value", "ratio"]);
      })
      .sort((a, b) => (a.value > b.value ? 1 : -1)),
    rightSide: req.body.rightSide
      .map((e) => {
        return _.pick(e, ["value", "ratio"]);
      })
      .sort((a, b) => (a.value > b.value ? 1 : -1)),
    id: req.body.id,
  };
  try {
    const exerciseFromDB = await Exercise.findOne({
      _id: req.body.id,
    });
    const exerciseFromDBFormated = {
      top:
        exerciseFromDB.exercise.top === "false"
          ? false
          : exerciseFromDB.exercise.top,
      leftSide: exerciseFromDB.exercise.leftSide
        .map((e) => {
          return _.pick(e, ["value", "ratio"]);
        })
        .sort((a, b) => (a.value > b.value ? 1 : -1)),
      rightSide: exerciseFromDB.exercise.rightSide
        .map((e) => {
          return _.pick(e, ["value", "ratio"]);
        })
        .sort((a, b) => (a.value > b.value ? 1 : -1)),
      id: exerciseFromDB._id.toString(),
    };
    const result = _.isEqual(exerciseFromDBFormated, exerciseFromUser);
    console.log(result);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
});
module.exports = router;
