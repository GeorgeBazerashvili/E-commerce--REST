const express = require("express");
const router = express.Router();
const {
  createCard,
  showCards,
  findCard,
  updateCard,
} = require("../controllers/controllers");
const verifier = require("../middlewares/Auth");

router.post("/admin/createcard", verifier, createCard);
router.get("/cards", showCards);
router.post("/findcard", findCard);
router.put("/update", verifier, updateCard);

module.exports = router;
