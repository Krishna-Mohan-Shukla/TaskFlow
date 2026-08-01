const User = require("../models/User");
const Task = require("../models/Task");


/* ===========================================================
   ADMIN DASHBOARD
=========================================================== */

const getDashboard = async (req, res) => {

    try {

        const totalUsers = await User.countDocuments({
            role: "user"
        });

        const totalTasks = await Task.countDocuments();

        const pending = await Task.countDocuments({
            status: "Pending"
        });

        const inProgress = await Task.countDocuments({
            status: "In Progress"
        });

        const done = await Task.countDocuments({
            status: "Done"
        });

        return res.status(200).json({

            success: true,

            dashboard: {

                totalUsers,

                totalTasks,

                pending,

                inProgress,

                done

            }

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
   TASK EXECUTION REGISTRY
=========================================================== */

const getAllTasks = async (req, res) => {

    try {

        const tasks = await Task.find()

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

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};



/* ===========================================================
   GET ALL USERS WITH TASK SUMMARY
=========================================================== */

const getAllUsers = async (req, res) => {

    try {

        const users = await User.find({
            role: "user"
        }).select("-password");

        const userData = await Promise.all(

            users.map(async (user) => {

                const totalTasks = await Task.countDocuments({
                    user: user._id
                });

                const pending = await Task.countDocuments({
                    user: user._id,
                    status: "Pending"
                });

                const inProgress = await Task.countDocuments({
                    user: user._id,
                    status: "In Progress"
                });

                const done = await Task.countDocuments({
                    user: user._id,
                    status: "Done"
                });

                return {

                    _id: user._id,

                    name: user.name,

                    email: user.email,

                    department: user.department,

                    totalTasks,

                    pending,

                    inProgress,

                    done

                };

            })

        );

        return res.status(200).json({

            success: true,

            totalUsers: userData.length,

            users: userData

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
   ADMIN ANALYTICS
=========================================================== */

const getAnalytics = async (req, res) => {

    try {

        const {

            department,
            employee,
            status,
            date

        } = req.query;

        const filter = {};

        if (department) {

            filter.department = department;

        }

        if (status) {

            filter.status = status;

        }

        if (employee) {

            filter.user = employee;

        }

        if (date) {

            const start = new Date(date);

            start.setHours(0, 0, 0, 0);

            const end = new Date(date);

            end.setHours(23, 59, 59, 999);

            filter.taskDate = {

                $gte: start,
                $lte: end

            };

        }

        const tasks = await Task.find(filter)

            .populate("user", "name email department role")

            .populate("createdBy", "name email department role")

            .sort({

                createdAt: -1

            });

        return res.status(200).json({

            success: true,

            totalRecords: tasks.length,

            tasks

        });

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

const updateUser = async (req, res) => {

    try {

        const {

            name,
            email,
            department,
            role

        } = req.body;

        const user = await User.findById(req.params.id);

        if (!user) {

            return res.status(404).json({

                success: false,

                message: "Employee Not Found."

            });

        }

        user.name = name || user.name;

        user.email = email || user.email;

        user.department = department || user.department;

        user.role = role || user.role;

        await user.save();

        return res.status(200).json({

            success: true,

            message: "Employee Updated Successfully.",

            user

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

const deleteUser = async (req, res) => {

    try {

        const user = await User.findById(req.params.id);

        if (!user) {

            return res.status(404).json({

                success: false,

                message: "Employee Not Found."

            });

        }

        if (user.role === "admin") {

            return res.status(400).json({

                success: false,

                message: "Admin account cannot be deleted."

            });

        }

        // Delete all tasks assigned to this employee
        await Task.deleteMany({

            user: user._id

        });

        await User.findByIdAndDelete(user._id);

        return res.status(200).json({

            success: true,

            message: "Employee Deleted Successfully."

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


module.exports = {

    getDashboard,
    getAllTasks,
    getAllUsers,
    getAnalytics,
    updateUser,
    deleteUser

};