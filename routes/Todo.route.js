const express = require("express");
const router = express.Router();

const {
  getTasks,
  getTaskById,
  addTask,
  removeTask,
  updateTask,
} = require("../controllers/Todo.controller");

router.get("/", getTasks);

router.get("/:id", getTaskById);

router.post("/", addTask);

router.put("/:id", updateTask);

router.delete("/:id", removeTask);

module.exports = router;
