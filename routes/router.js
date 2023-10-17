const express = require("express");
const router = express.Router();
const {
  createCard,
  showCards,
  findCard,
  updateCard,
  deleteCard,
} = require("../controllers/controllers");
const verifier = require("../middlewares/Auth");

router.post("/admin/createcard", verifier, createCard);
router.post("/findcard", findCard);
router.get("/cards", showCards);
router.put("/update", verifier, updateCard);
router.delete("/deletecard/:id", deleteCard);

module.exports = router;
