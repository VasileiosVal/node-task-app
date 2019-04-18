const express = require("express");
const router = express.Router();

const { registerUser, loginUser, verifyUser } = require("../controllers/auth");

router.post("/register", registerUser);

router.get("/verify/:hash", verifyUser);

router.post("/login", loginUser);

module.exports = router;
