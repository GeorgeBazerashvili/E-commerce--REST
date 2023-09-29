const express = require("express");
const router = express.Router();
const { getInfo } = require("../controllers/controllers");
const authorize = require("../middlewares/Auth");

router.get("/", authorize, getInfo);

module.exports = router;
