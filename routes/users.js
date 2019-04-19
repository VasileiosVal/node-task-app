const express = require("express");
const router = express.Router();

const validateObjId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { getUsers, getUser, getProfile } = require("../controllers/users");

router.get("/", [auth, admin], getUsers);

router.get("/profile", auth, getProfile);

router.get("/:id", [auth, admin, validateObjId], getUser);

module.exports = router;
