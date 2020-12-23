const express = require("express");
const router = express.Router();
const Exercise = require("../mongooseModels/exerciseModel");
const authMiddleware = require("../middleware/authMiddleware");

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
  try {
    res.json(req.body);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
});
module.exports = router;
