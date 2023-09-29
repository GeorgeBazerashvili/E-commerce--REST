const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide username"],
    unique: [true, "Username already exists"],
    minLength: [4, "Name's too short"],
    maxLength: [20, "Name's too long"],
    validate: {
      validator: async function (value) {
        const name = await this.constructor.findOne({ username: value });
        return !name;
      },
      message: "Username already exists.",
    },
  },
  email: {
    type: String,
    required: [true, "Please provide email address"],
    unique: [true, "Account with that email address already exists"],
    minLength: [10, "Email's too short"],
    maxLength: [40, "Email's too long"],
    validate: {
      validator: async function (value) {
        const emailAddress = await this.constructor.findOne({ email: value });
        return !emailAddress;
      },
      message: "Email address already in use",
    },
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minLength: [6, "Password's too short"],
    maxLength: [20, "Password's too long"],
    validate: {
      validator: async function (value) {
        if (/[A-Z]/.test(value)) {
          return true;
        }
        return false;
      },
      message: "Password must include uppercase characters",
    },
  },
  role: {
    type: String,
    default: "USER",
  },
});

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      const hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword;
    } catch (error) {
      console.log(error.message);
      return next(error);
    }
  }
  next();
});

module.exports = mongoose.model("User", UserSchema);
