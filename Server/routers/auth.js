const express = require("express");
const User = require("../models/userSchema");
const bcrypt = require("bcrypt");

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

      const result = await user.save();
      if (result) res.status(200).json("user registered!");
    } else {
      res.status(400).json("This email is not available.");
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  let token;
  if (!email || !password) res.status(400).json("Please fill all the fields.");

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json("Please enter proper credentials.");
    } else {
      if (await bcrypt.compare(password, user.password)) {
        token = await user.getAuthToken();
        console.log(token);

        res.cookie("jwtoken", token, {
          expires: new Date(Date.now() + 2592000000),
          httpOnly: true,
        });

        res.status(200).json("You are logged in!");
      } else {
        res.status(400).json({ error: "Please enter proper credentials." });
      }
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
