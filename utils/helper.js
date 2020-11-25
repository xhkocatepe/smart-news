const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { CustomError } = require('./customError');
const { ERR_UNDEFINED } = require('./messages').RETURN_MESSAGES;
const { JWT_SECRET } = require('../config/index');

module.exports.responseFormatter = (err, responseData, lang = 'tr') => {
    let status = 200;

    const result = {
        returnCode: 0,
        data: responseData,
    };

    if (err) {
        if (err instanceof CustomError) {
            status = err.httpStatus;
            result.returnCode = err.code;
            result.returnMessage = err.customMessage[lang];
        } else if (err.name === 'MongoError') {
            status = 400;
            result.returnCode = -9999;
            result.returnMessage = ERR_UNDEFINED.messages[lang];
        } else {
            status = 500;
            result.returnCode = -9999;
            result.returnMessage = ERR_UNDEFINED.messages[lang];
        }
    }

    return { status, result };
};

module.exports.asyncErrorCatcher = async (promise) => {
    let result;
    let error;
    try {
        result = await promise;
    } catch (e) {
        error = e;
    }
    return { error, result };
};

module.exports.hashPassword = async ({ plainPassword }) => {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(plainPassword, salt);

    return { salt, hash };
};

module.exports.validatePassword = async ({ password, hash }) => {
    const isValidPassword = await bcrypt.compare(password, hash);
    return { isValidPassword };
};

module.exports.generateTokens = ({ username }) => {
    const user = {
        username,
    };
    return jwt.sign(user, JWT_SECRET);
};

module.exports.verifyToken = ({ token, secret, expiresIn }) => jwt.verify(token, secret, { expiresIn });
