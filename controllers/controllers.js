const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function register_post(req, res) {
  try {
    const { username, email, password } = req.body;
    const user = await User.create({
      username,
      email,
      password,
    });

    const token = jwt.sign({ ID: user._id }, process.env.ACCESS_TOKEN);

    res.cookie("token", token, {
      maxAge: 3600000,
      path: "/",
      secure: true,
      sameSite: "none",
      httpOnly: true,
    });

    res.status(201).json("User successfully registered");
  } catch (error) {
    console.log(`Error during user registration ${error.message}`);
    res.status(400).json({ error });
  }
}

async function login_post(req, res) {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "email or password incorrect" });
    }

    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) {
      return res.status(401).json({ message: "email or password incorrect!" });
    } else if (correctPassword.length < 6) {
      return res.status(403).json({ message: "password too short!" });
    }

    const token = jwt.sign({ ID: user._id }, process.env.ACCESS_TOKEN);

    res.cookie("token", token, {
      maxAge: 3600000,
      path: "/",
      secure: true,
      sameSite: "none",
      httpOnly: true,
    });

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
  register_post,
  login_post,
};
