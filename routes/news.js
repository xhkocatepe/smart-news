const express = require('express');

const newsController = require('../controllers/news');
const newsValidation = require('../validations/news');
const asyncErrorHandlerMiddleware = require('../middlewares/asyncErrorHandler');
const asyncValidator = require('../middlewares/asyncValidator');
const authenticationMiddleware = require('../middlewares/authentication');

const router = express.Router();

router
    .route('/')
    .get(
        authenticationMiddleware.optionalAuth,
        newsValidation.getLatestNewsAsPublic(),
        asyncValidator(),
        async (req, res, next) => {
            asyncErrorHandlerMiddleware(req, res, next, newsController.getNews(req.query, req.tokenData));
        },
    );


module.exports = router;
