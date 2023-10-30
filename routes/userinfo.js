const express = require("express");
const router = express.Router();
const { getInfo, updateBalance } = require("../controllers/controllers");
const authorize = require("../middlewares/Auth");

router.get("/", authorize, getInfo);
router.put("/update/:id", updateBalance);

module.exports = router;
