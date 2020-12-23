const express = require("express");
const router = express.Router();
const Exercise = require("../mongooseModels/exerciseModel");
const authMiddleware = require("../middleware/authMiddleware");

// @route GET api/blueprints
// @desc  Get all blueprints
// @access Private
router.get("/", authMiddleware, async (req, res) => {
  try {
    const exercises = await Exercise.find({
      user: req.user.id,
    });
    res.json(exercises);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
});

// @route POST api/blueprints
// @desc  Add new blueprint
// @access Private
router.post("/", authMiddleware, async (req, res) => {
  const { blueprint, exercise } = req.body;
  try {
    const newExercise = new Exercise({
      blueprint: {
        name: blueprint.name,
        top: blueprint.top,
        leftSide: blueprint.leftSide,
        rightSide: blueprint.rightSide,
      },
      exercise: {
        name: exercise.name,
        top: exercise.top,
        leftSide: exercise.leftSide,
        rightSide: exercise.rightSide,
      },
      user: req.user.id,
    });
    const exer = await newExercise.save();
    res.json(exer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
});
module.exports = router;
