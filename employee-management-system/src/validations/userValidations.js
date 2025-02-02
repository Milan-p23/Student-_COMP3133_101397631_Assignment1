// validations/userValidations.js
const { check } = require('express-validator');

const validateSignup = [
  check('username')
    .trim()
    .notEmpty().withMessage('Username is required ')
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long '),
  check('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format'),
  check('password')
    .trim()
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

const validateLogin = [
  check('usernameOrEmail')
    .trim()
    .notEmpty().withMessage('Username or email is required'),
  check('password')
    .trim()
    .notEmpty().withMessage('Password is required')
];

module.exports = {
  validateSignup,
  validateLogin
};