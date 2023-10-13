const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    minlength: 7,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Card", CardSchema);
