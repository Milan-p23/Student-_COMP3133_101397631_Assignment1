// validations/employeeValidations.js
const { check } = require('express-validator');

const validateEmployee = [
  check('first_name')
    .trim()
    .notEmpty().withMessage('First name is required'),
  check('last_name')
    .trim()
    .notEmpty().withMessage('Last name is required'),
  check('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format'),
  check('gender')
    .trim()
    .notEmpty().withMessage('Gender is required')
    .isIn(['Male', 'Female', 'Other']).withMessage('Invalid gender value'),
  check('designation')
    .trim()
    .notEmpty().withMessage('Designation is required'),
  check('salary')
    .notEmpty().withMessage('Salary is required')
    .isFloat({ min: 1000 }).withMessage('Salary must be at least 1000'),
  check('date_of_joining')
    .notEmpty().withMessage('Date of joining is required')
    .isISO8601().withMessage('Invalid date format'),
  check('department')
    .trim()
    .notEmpty().withMessage('Department is required')
];

module.exports = {
  validateEmployee
};