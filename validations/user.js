const { body } = require('express-validator/check');
const { VALIDATION_MESSAGES } = require('./../utils/messages');

module.exports.userCredential = () => [
    body('username')
        .exists()
        .withMessage(VALIDATION_MESSAGES.MISSING_FIELDS)
        .isAlphanumeric()
        .withMessage(VALIDATION_MESSAGES.INVALID_USERNAME)
        .isLength({ max: 20, min: 6 })
        .withMessage(VALIDATION_MESSAGES.INVALID_USERNAME),
    body('password')
        .exists()
        .withMessage(VALIDATION_MESSAGES.MISSING_FIELDS)
        .isLength({ max: 10, min: 6 })
        .withMessage(VALIDATION_MESSAGES.INVALID_PASSWORD),
];
