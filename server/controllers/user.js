const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// @desc   Register a new user
// @route  /api/users
// @access Public
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validation
        if (!name || !email || !password) {
            res.status(400);
            throw new Error('All fields are required');
        }

        // Find if user already exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(400);
            throw new Error('User already exists');
        }

        // Hash password
        const hashedPassword = bcrypt.hashSync(password, 10);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            });
        } else {
            res.status(400);
            throw new Error('Invalid user data');
        }


    } catch (err) {
        console.error(err);
        res.status(404);
        res.json({ message: err.message });
    }



};

// @desc   Login user
// @route  /api/users/login
// @access Public
const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        // Check user and compare passwords
        if (user && bcrypt.compareSync(password, user.password)) {

            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            });

        } else {
            res.status(401);
            throw new Error('Invalid email or password');
        }
    } catch (err) {
        console.error(err);
        res.status(404);
        res.json({ message: err.message });
    }

};

// Generate token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

module.exports = {
    registerUser,
    loginUser,
};