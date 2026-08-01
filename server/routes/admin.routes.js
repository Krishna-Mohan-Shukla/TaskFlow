const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth.middleware");

const adminOnly = require("../middleware/admin.middleware");

const {

    getDashboard,
    getAllTasks,
    getAllUsers,
    getAnalytics,
    updateUser,
    deleteUser

} = require("../controllers/admin.controller");



router.get(

    "/dashboard",

    protect,

    adminOnly,

    getDashboard

);



router.get(

    "/tasks",

    protect,

    adminOnly,

    getAllTasks

);



router.get(

    "/users",

    protect,

    adminOnly,

    getAllUsers

);



router.get(

    "/analytics",

    protect,

    adminOnly,

    getAnalytics

);

router.put(
    "/user/:id",
    protect,
    adminOnly,
    updateUser
);

router.delete(
    "/user/:id",
    protect,
    adminOnly,
    deleteUser
);



module.exports = router;