const express = require("express");
const router = express.Router();
const { getInfo } = require("../controllers/controllers");
const authorize = require("../middlewares/Auth");

router.get("/", authorize, getInfo);
// router.put("/update", authorize, updateBalance);

module.exports = router;
