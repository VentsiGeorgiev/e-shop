const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            try {
                //Get Token from header
                token = req.headers.authorization.split(' ')[1];
                // Verify token
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                // Get user from token
                req.user = await User.findById(decoded.id).select('-password');

                next();
            } catch (err) {
                res.status(401);
                throw new Error('Not Authorized');
            }
        }

        if (!token) {
            res.status(401);
            throw new Error('Not Authorized');
        }
    } catch (err) {
        console.error(err);
        res.status(404);
        res.json({ message: err.message });
    }



};

module.exports = { protect };