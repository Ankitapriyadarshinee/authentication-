const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth.controller");
const verifyToken = require("../middleware/auth.middleware");

router.post("/signup", controller.signup);
router.post("/login", controller.login);
router.get("/profile", verifyToken, controller.profile);

module.exports = router;