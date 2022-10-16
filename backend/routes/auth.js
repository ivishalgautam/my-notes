const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const JWT_SECRET = "vishalgautam";
const fetchUser = require("../middleware/fetchUser");

// Route 1: create a new user
router.post(
  "/createUser",
  [body("name"), body("email").isEmail(), body("password")],
  async (req, res) => {
    let success = false;
    try {
      // if there are any error, returns bad request and error.
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
      }

      // Check whether the user with this email already exists.
      let emailExist = await User.findOne({ email: req.body.email });
      if (emailExist) {
        return res
          .status(400)
          .send({ success, msg: "sorry a user with this email already exist" });
      }

      // Create hashed password
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(req.body.password, salt);

      // create a new user.
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPass,
      });

      // Create token for user to login
      const authToken = jwt.sign({ _id: user._id }, JWT_SECRET);
      const savedUser = await user.save();
      res
        .status(200)
        .send({ success: !success, msg: "User Created", authToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send(success, "internal server error");
    }
  }
);

//Route 2: Login user using credentials
router.post(
  "/login",
  [
    body("email", "enter a valid email").isEmail(),
    body("password", "password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    // if there are any error, returns bad request and error.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    try {
      // Check email if exist
      let user = await User.findOne({ email: req.body.email });
      if (!user)
        return res
          .status(400)
          .json({ success, error: "try to login with correct credentials." });

      // Check password
      let comparePass = await bcrypt.compare(req.body.password, user.password);
      if (!comparePass)
        return res
          .status(400)
          .json({ success, error: "try to login with correct credentials." });

      // Create and assign a token
      const authToken = jwt.sign({ _id: user._id }, JWT_SECRET);
      res
        .header("auth-token", authToken)
        .send({ success: !success, authToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("internal server error");
    }
  }
);

//Route 3: Verify user

router.post("/getuser", fetchUser, async (req, res) => {
  try {
    userId = req.user;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    res.status(401);
  }
});

module.exports = router;
