const express = require("express");
const User = require("../models/userSchema");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("This is main screen");
});

router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
    res.status(402).json("Please enter complete information");
  }

  if (password != cpassword) {
    res.status(400).json("password and confirm password fields do not match.");
  }
  try {
    const registered = await User.findOne({ email });

    if (!registered) {
      const user = new User({ name, email, phone, work, password, cpassword });
      user.save();
      res.status(200).json("user registered!");
    } else {
      res.status(400).json("This email is not available.");
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
