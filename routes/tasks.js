const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const validateObjId = require("../middleware/validateObjectId");
const {
  getTasks,
  storeTask,
  updateTask,
  deleteTask
} = require("../controllers/tasks");

router.get("/", auth, getTasks);
router.post("/", auth, storeTask);
router.patch("/:id", [auth, validateObjId], updateTask);
router.delete("/:id", [auth, validateObjId], deleteTask);

module.exports = router;
