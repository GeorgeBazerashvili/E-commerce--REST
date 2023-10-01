const express = require("express");
const router = express.Router();
const { createCard } = require("../controllers/controllers");
const verifier = require("../middlewares/Auth");

router.post("/admin/createcard", verifier, createCard);

module.exports = router;
