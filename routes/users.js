const express = require("express");
const router = express.Router();
const User = require("../mongooseModels/userModel");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");
router.get("/login", authMiddleware, async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
});

router.post(
  "/login",
  [
    check("email", "please enter email").isEmail(),
    check("password", "please enter valid password").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "invalid email" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: "invalid password" });
      }
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        "***REMOVED***",
        {
          expiresIn: 36500,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ msg: "server error" });
    }
  }
);

router.post(
  "/register",
  [
    check("login", "login is required").not().isEmpty(),
    check("email", "include valid email").isEmail(),
    check(
      "password",
      "please enter a password that is 6 char or more"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { login, email, password } = req.body;
    try {
      let user = await User.findOne({ email: email });
      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }

      user = new User({ login, email, password });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        "***REMOVED***",
        {
          expiresIn: 36500,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
      console.log("done");
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Something went wrong" });
    }
  }
);
module.exports = router;
