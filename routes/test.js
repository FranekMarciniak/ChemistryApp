const express = require("express");
const router = express.Router();
const Exercise = require("../mongooseModels/exerciseModel");

// @route GET api/test
// @desc  Get one random exercise and send test exercise
// @access Private
router.get("/", async (req, res) => {
  try {
    res.json(req.body);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
});
// @route POST api/blueprints
// @desc  Add new blueprint
// @access Private
router.post("/", async (req, res) => {
  try {
    res.json(req.body);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
});
module.exports = router;
