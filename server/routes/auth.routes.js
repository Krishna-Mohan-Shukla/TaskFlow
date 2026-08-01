const express = require("express");

const router = express.Router();

const {

    registerUser,

    loginUser,

    getCurrentUser

} = require("../controllers/auth.controller");

const protect = require("../middleware/auth.middleware");


// Register

router.post("/register", registerUser);


// Login

router.post("/login", loginUser);


// Current User

router.get("/me", protect, getCurrentUser);


module.exports = router;