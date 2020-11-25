const { query, param } = require('express-validator/check');
const { sanitizeQuery } = require('express-validator/filter');

const { VALIDATION_MESSAGES } = require('./../utils/messages');

module.exports.getReadLaterNews = () => [
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

module.exports.saveReadLaterNews = () => [
    param('newsId')
        .exists()
        .withMessage(VALIDATION_MESSAGES.MISSING_FIELDS)
        .isMongoId()
        .withMessage(VALIDATION_MESSAGES.INVALID_NEWS_ID),
];

module.exports.removeReadLaterNews = () => [
    param('newsId')
        .exists()
        .withMessage(VALIDATION_MESSAGES.MISSING_FIELDS)
        .isMongoId()
        .withMessage(VALIDATION_MESSAGES.INVALID_NEWS_ID),
];
