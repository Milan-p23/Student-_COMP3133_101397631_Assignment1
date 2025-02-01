const jwt = require('jsonwebtoken');

const authenticate = (token) => {
    if (!token) {
        throw new Error("Authentication failed: No token provided");
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        return verified; 
    } catch (error) {
        throw new Error("Authentication failed: Invalid token");
    }
};

module.exports = { authenticate };
