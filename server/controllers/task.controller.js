const Task = require("../models/Task");
const User = require("../models/User");

/* ===========================================================
   CREATE TASK
=========================================================== */
console.log("Task Controller File Loaded");

const createTask = async (req, res) => {

    try {

        const {
            user,
            department,
            client,
            title,
            description,
            priority,
            taskDate
        } = req.body;

        /* ===========================================================
           VALIDATION
        =========================================================== */

        if (
            !department ||
            !client ||
            !title ||
            !taskDate
        ) {

            return res.status(400).json({

                success: false,

                message: "Please fill all required fields."

            });

        }

        /* ===========================================================
           ASSIGN EMPLOYEE
        =========================================================== */

        const assignedUser =

            req.user.role === "admin"
                ? user
                : req.user._id;

        if (!assignedUser) {

            return res.status(400).json({

                success: false,

                message: "Please select an employee."

            });

        }

        /* ===========================================================
           CHECK EMPLOYEE EXISTS
        =========================================================== */

        const employee = await User.findById(assignedUser);

        if (!employee) {

            return res.status(404).json({

                success: false,

                message: "Employee not found."

            });

        }

        /* ===========================================================
           CREATE TASK
        =========================================================== */

        const task = await Task.create({

            user: assignedUser,

            createdBy: req.user._id,

            department,

            client,

            title,

            description,

            priority,

            taskDate

        });

        /* ===========================================================
           RETURN POPULATED TASK
        =========================================================== */

        const populatedTask = await Task.findById(task._id)

            .populate("user", "name email department role")

            .populate("createdBy", "name email department role");

        return res.status(201).json({

            success: true,

            message: "Task Created Successfully.",

            task: populatedTask

        });

    }

    catch (error) {

        console.error("Create Task Error :", error);

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/* ===========================================================
   GET MY TASKS
=========================================================== */

const getMyTasks = async (req, res) => {

    try {

        const tasks = await Task.find({

            user: req.user._id

        })

            .populate("user", "name email department role")

            .populate("createdBy", "name email department role")

            .sort({

                createdAt: -1

            });
        return res.status(200).json({

            success: true,

            totalTasks: tasks.length,

            tasks

        });

    }

    catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};



/* ===========================================================
   GET SINGLE TASK
=========================================================== */

const getTaskById = async (req, res) => {

    try {

        let task;

        if (req.user.role === "admin") {

            task = await Task.findById(req.params.id)

                .populate("user", "name email department role")

                .populate("createdBy", "name email department role");

        }

        else {

            task = await Task.findOne({

                _id: req.params.id,

                user: req.user._id

            })

                .populate("user", "name email department role")

                .populate("createdBy", "name email department role");

        }

        if (!task) {

            return res.status(404).json({

                success: false,

                message: "Task Not Found."

            });

        }

        return res.status(200).json({

            success: true,

            task

        });

    }

    catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/* ===========================================================
   UPDATE TASK
=========================================================== */

const updateTask = async (req, res) => {

    try {

        const {

            user,

            department,

            client,

            title,

            description,

            priority,

            taskDate,

            remarks,

            status

        } = req.body;

        /* ==========================================
           FIND TASK
        ========================================== */

        let task;

        if (req.user.role === "admin") {

            task = await Task.findById(req.params.id);

        } else {

            task = await Task.findOne({

                _id: req.params.id,

                user: req.user._id

            });

        }

        /* ==========================================
           CHECK TASK
        ========================================== */

        if (!task) {

            return res.status(404).json({

                success: false,

                message: "Task Not Found."

            });

        }

        /* ==========================================
           ADMIN ONLY
        ========================================== */

        if (req.user.role === "admin") {

            if (user) {

                const employee = await User.findById(user);

                if (!employee) {

                    return res.status(404).json({

                        success: false,

                        message: "Employee Not Found."

                    });

                }

                task.user = user;

            }

            if (status) {

                task.status = status;

            }

        }

        /* ==========================================
           COMMON UPDATE
        ========================================== */

        task.department = department || task.department;

        task.client = client || task.client;

        task.title = title || task.title;

        task.description = description || task.description;

        task.priority = priority || task.priority;

        task.taskDate = taskDate || task.taskDate;

        task.remarks = remarks || task.remarks;

        await task.save();

        const updatedTask = await Task.findById(task._id)
            .populate("user", "name email department role")
            .populate("createdBy", "name email department role");

        return res.status(200).json({

            success: true,

            message: "Task Updated Successfully.",

            task: updatedTask

        });

    }

    catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/* ===========================================================
   DELETE TASK
=========================================================== */

const deleteTask = async (req, res) => {

    try {

        if (req.user.role === "admin") {

            task = await Task.findById(req.params.id);

        } else {

            task = await Task.findOne({

                _id: req.params.id,

                user: req.user._id

            });

        }


        if (!task) {

            return res.status(404).json({

                success: false,

                message: "Task Not Found."

            });

        }


        await Task.findByIdAndDelete(task._id);


        return res.status(200).json({

            success: true,

            message: "Task Deleted Successfully."

        });

    }

    catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/* ===========================================================
   START TASK
=========================================================== */

const startTask = async (req, res) => {

    try {

        if (req.user.role === "admin") {

            task = await Task.findById(req.params.id);

        } else {

            task = await Task.findOne({

                _id: req.params.id,

                user: req.user._id

            });

        }
        if (!task) {

            return res.status(404).json({

                success: false,

                message: "Task Not Found."

            });

        }

        // Already Running

        if (task.startTime && !task.endTime) {

            return res.status(400).json({

                success: false,

                message: "Task Already Started."

            });

        }

        task.startTime = new Date();

        task.endTime = null;

        task.status = "In Progress";

        await task.save();

        return res.status(200).json({

            success: true,

            message: "Task Started Successfully.",

            task

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


/* ===========================================================
   STOP TASK
=========================================================== */

const stopTask = async (req, res) => {

    try {

        if (req.user.role === "admin") {

            task = await Task.findById(req.params.id);

        } else {

            task = await Task.findOne({

                _id: req.params.id,

                user: req.user._id

            });

        }

        if (!task) {

            return res.status(404).json({

                success: false,

                message: "Task Not Found."

            });

        }

        if (!task.startTime) {

            return res.status(400).json({

                success: false,

                message: "Task Not Started Yet."

            });

        }

        task.endTime = new Date();

        // Calculate Working Seconds

        const seconds = Math.floor(

            (task.endTime.getTime() - task.startTime.getTime())

            / 1000

        );

        task.totalWorkingSeconds += seconds;

        task.workHours = Math.floor(task.totalWorkingSeconds / 3600);

        task.workMinutes = Math.floor(

            (task.totalWorkingSeconds % 3600) / 60

        );

        task.status = "Done";

        await task.save();

        return res.status(200).json({

            success: true,

            message: "Task Completed Successfully.",

            task

        });

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


/* ===========================================================
   UPDATE TASK STATUS
=========================================================== */

const updateTaskStatus = async (req, res) => {

    try {

        const { status, remarks, extraTime } = req.body;

        if (req.user.role === "admin") {

            task = await Task.findById(req.params.id);

        } else {

            task = await Task.findOne({

                _id: req.params.id,

                user: req.user._id

            });

        }

        if (!task) {

            return res.status(404).json({

                success: false,

                message: "Task Not Found."

            });

        }

        if (status) {

            task.status = status;

        }

        if (remarks) {

            task.remarks = remarks;

        }

        if (extraTime) {

            task.extraTime = extraTime;

        }

        await task.save();

        return res.status(200).json({

            success: true,

            message: "Task Updated Successfully.",

            task

        });

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

console.log("Before Export");

module.exports = {

    createTask,

    getMyTasks,

    getTaskById,

    updateTask,

    deleteTask,

    startTask,

    stopTask,

    updateTaskStatus

};

console.log("After Export");