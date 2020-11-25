const { query } = require('express-validator/check');
const { sanitizeQuery } = require('express-validator/filter');

const { VALIDATION_MESSAGES } = require('./../utils/messages');
const { RSS_SOURCE } = require('../utils/constants');

module.exports.getLatestNewsAsPublic = () => [
    query('source')
        .optional()
        .isString()
        .withMessage(VALIDATION_MESSAGES.INVALID_FORMAT)
        .isIn(Object.values(RSS_SOURCE))
        .withMessage(VALIDATION_MESSAGES.INVALID_VALUE_FOR_RSS_SOURCE),
    query('page')
        .optional()
        .isInt({ min: 0 })
        .withMessage(VALIDATION_MESSAGES.INVALID_INTERVAL_FOR_PAGE),
    query('limit')
        .optional()
        .isInt({ min: 0, max: 100 })
        .withMessage(VALIDATION_MESSAGES.INVALID_INTERVAL_FOR_LIMIT),
    sanitizeQuery('page').toInt(),
    sanitizeQuery('limit').toInt(),
];
