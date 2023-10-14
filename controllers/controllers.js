const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Card = require("../models/Card");

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
  try {
    const currentUser = await User.findOne({ _id: req.user.ID });

    return res.status(200).json({
      message: `Welcome ${currentUser.username}`,
      response: currentUser,
    });
  } catch (error) {
    console.log(error.message);
  }
}

async function createCard(req, res) {
  try {
    const { name, description, image, price } = req.body;
    const newPrice = price * 0.95;
    const card = await Card.create({
      name,
      description,
      image,
      price: newPrice,
    });
    res.status(201).json({ message: "done", card: card });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
}

async function showCards(req, res) {
  const card = await Card.find({});
  try {
    res.status(200).json({ data: card });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function findCard(req, res) {
  const { ID } = req.body;
  const card = await Card.findOne({ _id: ID });
  res.status(200).json({ card });
}

async function updateCard(req, res) {
  const { name, description, image, price, id } = req.body;
  const card = await Card.findOne({ _id: id });
  card.name = name;
  card.description = description;
  card.price = price;
  card.image = image;
  card.save();

  res.status(200).json({ message: "Updated Successfully", card });
}

async function deleteCard(req, res) {
  try {
    const { id } = req.params;
    console.log(id);
    const card = await Card.findOne({ _id: id });
    if (!card) {
      return res.status(400).json({ message: "card does not exist" });
    }

    await Card.findOneAndDelete({ _id: id }).exec();

    res.status(200).json({ message: "Card deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "some issue", error: error.message });
  }
}

module.exports = {
  register_post,
  login_post,
  getInfo,
  createCard,
  showCards,
  findCard,
  updateCard,
  deleteCard,
};
