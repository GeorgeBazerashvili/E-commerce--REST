const { Router } = require("express");
const { register_post, login_post } = require("../controllers/controllers");

const router = Router();

router.post("/register", register_post);
router.post("/login", login_post);

module.exports = router;
