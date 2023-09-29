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

    const token = jwt.sign({ ID: user._id }, process.env.ACCESS_TOKEN, {
      expiresIn: "1h",
    });

    res.status(201).json({ message: "User successfully registered", token });
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
    }

    const token = jwt.sign({ ID: user._id }, process.env.ACCESS_TOKEN, {
      expiresIn: "1h",
    });

    if (user.role === "ADMIN") {
      console.log("ADMIN");
      return res
        .status(200)
        .json({ message: "admin joined the chat", role: "admin", token });
    }
    res.status(200).json({ message: "Login successful", role: "user", token });
    console.log("USER");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function getInfo(req, res) {
  const currentUser = await User.findOne({ _id: req.user.ID });

  return res.status(200).json({
    message: `Welcome ${currentUser.username}`,
    response: currentUser,
  });
}

module.exports = {
  register_post,
  login_post,
  getInfo,
};
