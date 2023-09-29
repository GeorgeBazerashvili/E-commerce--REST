require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRouter = require("./routes/auth");
const userInfoRouter = require("./routes/userinfo");

const app = express();

app.use(
  cors({
    origin: "https://vanillatech.netlify.app",
    methods: ["GET", "POST", "HEAD"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRouter);
app.use("/info", userInfoRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is listening on port ${process.env.PORT || 3000}`);
});

mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to the database...");
  })
  .catch((err) => console.log(err));
