const jwt = require('jsonwebtoken');

const authenticate = (token) => {
    if (!token) return null; // Return null instead of throwing error
    
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        console.error('Authentication error:', error.message);
        return null; // Return null for invalid tokens
    }
};

module.exports = { authenticate };
