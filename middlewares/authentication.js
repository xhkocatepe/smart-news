const jwt = require('jsonwebtoken');
const logger = require('../config/winston');
const { JWT_SECRET } = require('../config/index');
const helper = require('../utils/helper');
const { ACCESS_TOKEN_EXPIRATION } = require('../utils/constants');
const { AuthorizationError, AuthenticationError } = require('../utils/customError');

module.exports.auth = async (req, res, next) => {
    let token = req.header('authorization');

    if (!token) {
        return next(new AuthorizationError());
    }

    if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
    }

    try {
        const { username } = helper.verifyToken({ token, secret: JWT_SECRET, expiresIn: ACCESS_TOKEN_EXPIRATION });


        if (!username) {
            logger.warn('Auth Error: Can not found username in jwt');
            return next(new AuthorizationError());
        }

        req.tokenData = { username };
        return next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            logger.error('Auth Error: User token Expired', { accessToken: token });
            return next(new AuthenticationError());
        }
        logger.error('Auth Error: Invalid User Token - Token Verification',
            { accessToken: token });

        return next(new AuthorizationError());
    }
};

module.exports.optionalAuth = async (req, res, next) => {
    let token = req.header('authorization');
    req.tokenData = { username: undefined };

    if (!token) {
        return next();
    }

    if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
    }

    try {
        const { username } = helper.verifyToken({ token, secret: JWT_SECRET, expiresIn: ACCESS_TOKEN_EXPIRATION });
        if (!username) {
            logger.warn('Optional Auth Warn: Can not found username in jwt');
            return next();
        }
        req.tokenData = { username };

        return next();
    } catch (error) {
        logger.warn('Optional Auth Warn: Invalid User Token - Token Verification', { accessToken: token });

        return next();
    }
};
