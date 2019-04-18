const express = require("express");
const validateObjId = require("../middleware/validateObjectId");
const router = express.Router();

const { getUsers, getUser, getProfile } = require("../controllers/users");

router.get("/", getUsers);

router.get("/:id", validateObjId, getUser);

router.get("/profile", getProfile);

module.exports = router;
