const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1] || '';
    if (!token) {
        return res.status(401).json({ message: 'Authentication failed: No token provided' });
    }
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.verifiedUser = verified;
        console.log("Verification successful", verified);
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Authentication failed: Invalid token' }, error);
    }
}

module.exports = { authenticate };
