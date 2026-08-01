const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");


// ==============================
// Register
// ==============================

const registerUser = async (req, res) => {

    try {

        const {
            name,
            department,
            email,
            password
        } = req.body;

        if (
            !name ||
            !department ||
            !email ||
            !password
        ) {

            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });

        }

        const existingUser = await User.findOne({
            email
        });

        if (existingUser) {

            return res.status(400).json({
                success: false,
                message: "Email already registered"
            });

        }

        const hashedPassword =
            await bcrypt.hash(password, 10);

        const user = await User.create({

            name,

            department,

            email,

            password: hashedPassword,

            role: "user"

        });

        res.status(201).json({

            success: true,

            message: "Registration Successful",

            token: generateToken(user._id),

            user: {

                id: user._id,

                name: user.name,

                email: user.email,

                department: user.department,

                role: user.role

            }

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// ==============================
// Login
// ==============================

const loginUser = async (req, res) => {

    try {

        const {

            email,

            password

        } = req.body;

        if (!email || !password) {

            return res.status(400).json({

                success: false,

                message: "Email and Password required"

            });

        }

        const user = await User.findOne({

            email

        });

        if (!user) {

            return res.status(400).json({

                success: false,

                message: "Invalid Credentials"

            });

        }

        const isMatch = await bcrypt.compare(

            password,

            user.password

        );

        if (!isMatch) {

            return res.status(400).json({

                success: false,

                message: "Invalid Credentials"

            });

        }

        res.status(200).json({

            success: true,

            message: "Login Successful",

            token: generateToken(user._id),

            user: {

                id: user._id,

                name: user.name,

                email: user.email,

                department: user.department,

                role: user.role

            }

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// ==============================
// Current User
// ==============================

const getCurrentUser = async (req, res) => {

    res.status(200).json({

        success: true,

        user: req.user

    });

};


module.exports = {

    registerUser,

    loginUser,

    getCurrentUser

};