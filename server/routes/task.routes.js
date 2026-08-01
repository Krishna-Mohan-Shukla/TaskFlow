const express = require("express");

const router = express.Router();

const {

    createTask,

    getMyTasks,

    getTaskById,

    updateTask,

    deleteTask,

    startTask,

    stopTask,

    updateTaskStatus

} = require("../controllers/task.controller");

const protect = require("../middleware/auth.middleware");

console.log("protect =>", protect);
console.log("createTask =>", createTask);
console.log(require("../controllers/task.controller"));
router.post("/create", protect, createTask);

router.get("/my-tasks", protect, getMyTasks);

router.get("/:id", protect, getTaskById);

router.put("/update/:id", protect, updateTask);

router.delete("/delete/:id", protect, deleteTask);

router.put("/start/:id", protect, startTask);

router.put("/stop/:id", protect, stopTask);

router.put("/status/:id", protect, updateTaskStatus);

module.exports = router;