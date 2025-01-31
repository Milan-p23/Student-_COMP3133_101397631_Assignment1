const jwt = require('jsonwebtoken');
const { create } = require('../models/Employee');

// const createToken = (user) => {
//   return jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
//     expiresIn: '7d',
//   });
// }

const createToken = (user) => {
    return jwt.sign({ user }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
    }

    module.exports = { createToken };


