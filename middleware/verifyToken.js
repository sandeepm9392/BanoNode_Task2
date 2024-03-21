const jwt = require('jsonwebtoken');
const createError = require('./error.js');
const User = require('../models/auth.js');

const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.access_token;
        if (!token) {
            throw createError(401, 'Token not found failed authentication');
        }
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT);
        const user = await User.findById(decoded.userId);
        if (!user) {
            throw createError(401, 'User not found authentication failed in vt.js');
        }
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = verifyToken;
