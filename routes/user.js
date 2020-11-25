const express = require('express');

const userController = require('../controllers/user');
const userNewsController = require('../controllers/userNews');
const userNewsValidation = require('../validations/userNews');
const userValidation = require('../validations/user');
const authenticationMiddleware = require('../middlewares/authentication');

const asyncErrorHandlerMiddleware = require('../middlewares/asyncErrorHandler');
const asyncValidator = require('../middlewares/asyncValidator');

const router = express.Router();

router
    .route('/registration')
    .post(
        userValidation.userCredential(),
        asyncValidator(),
        async (req, res, next) => {
            asyncErrorHandlerMiddleware(req, res, next, userController.register(req.body));
        },
    );

router
    .route('/login')
    .post(
        userValidation.userCredential(),
        asyncValidator(),
        async (req, res, next) => {
            asyncErrorHandlerMiddleware(req, res, next, userController.login(req.body));
        },
    );

router
    .route('/read-later')
    .get(
        authenticationMiddleware.auth,
        userNewsValidation.getReadLaterNews(),
        asyncValidator(),
        async (req, res, next) => {
            asyncErrorHandlerMiddleware(req, res, next, userNewsController.getReadLaterNews(req.query, req.tokenData));
        },
    );

router
    .route('/read-later/:newsId')
    .post(
        authenticationMiddleware.auth,
        userNewsValidation.saveReadLaterNews(),
        asyncValidator(),
        async (req, res, next) => {
            asyncErrorHandlerMiddleware(req, res, next, userNewsController.saveReadLaterNews(req.params, req.tokenData));
        },
    )
    .delete(
        authenticationMiddleware.auth,
        userNewsValidation.removeReadLaterNews(),
        asyncValidator(),
        async (req, res, next) => {
            asyncErrorHandlerMiddleware(req, res, next, userNewsController.removeReadLaterNews(req.params, req.tokenData));
        },
    );

module.exports = router;
