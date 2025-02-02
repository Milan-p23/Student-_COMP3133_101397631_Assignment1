const { validationResult } = require('express-validator');

const validateInput = async (validations, inputData) => {
    // Create a fake `req` object with a `body` property
    const fakeReq = { body: inputData };

    // Run all validation checks
    for (let validation of validations) {
        await validation.run(fakeReq); //  Use fake `req`
    }

    // Collect validation errors
    const errors = validationResult(fakeReq);
    if (!errors.isEmpty()) {
        throw new Error(errors.array().map(err => err.msg).join(', ')); // Return formatted errors
    }
};

module.exports = { validateInput };
