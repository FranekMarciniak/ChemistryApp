const express = require("express");
const router = express.Router();
const Blueprint = require("../mongooseModels/blueprintModel");
const authMiddleware = require("../middleware/authMiddleware");
// @route GET api/blueprints
// @desc  Get all blueprints
// @access Private
router.get("/", authMiddleware, async (req, res) => {
  try {
    const blueprints = await Blueprint.find({ user: req.user.id });
    res.json(blueprints);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
});
// @route POST api/blueprints
// @desc  Add new blueprint
// @access Private
router.post("/", authMiddleware, async (req, res) => {
  const { name, leftSide, rightSide, top, id } = req.body;
  const user = req.user.id;
  try {
    const newBlueprint = new Blueprint({
      name,
      leftSide,
      rightSide,
      top,
      id,
      user,
    });
    const blueprint = await newBlueprint.save();
    res.json(blueprint);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
});
module.exports = router;
