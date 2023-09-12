const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./routes/auth");
const cookieParser = require("cookie-parser");

const app = express();

// Configure CORS middleware
app.use(
  cors({
    origin: "https://eccomerce-client.vercel.app",
    credentials: "include",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Specify the allowed HTTP methods
    optionsSuccessStatus: 200,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Define your routes
app.use("/api/authentication", router); // Removed the trailing slash

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is listening on port ${process.env.PORT || 3000}`);
});

mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to database...");
  })
  .catch((err) => console.log(err));
