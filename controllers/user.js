const userBusiness = require('./../business/user');
const { BadRequestError, AuthenticationError } = require('./../utils/customError');
const { RETURN_MESSAGES } = require('./../utils/messages');
const helper = require('./../utils/helper');

module.exports.register = async ({ username, password }) => {
    const isUsernameInUse = await userBusiness.isUsernameInUse({ username });

    if (isUsernameInUse) {
        throw new BadRequestError(
            RETURN_MESSAGES.ERR_USERNAME_IN_USE.messages,
            RETURN_MESSAGES.ERR_USERNAME_IN_USE.code
        );
    }

    const { salt, hash } = await helper.hashPassword({ plainPassword: password });
    const user = {
        username,
        passwordSalt: salt,
        passwordHash: hash,
    };

    await userBusiness.create({ user });

    return {
        username,
    };
};

module.exports.login = async ({ username, password }) => {
    const userCredentials = await userBusiness.getUser({ username });

    if (!userCredentials) {
        // if there is user on system and user is not active on system, then error type authorization
        // When user not found system then error type Authentication
        throw new AuthenticationError(
            RETURN_MESSAGES.ERR_USERNAME_NOTFOUND.messages,
            RETURN_MESSAGES.ERR_USERNAME_NOTFOUND.code
        );
    }

    const { isValidPassword } = await helper.validatePassword({ password, hash: userCredentials.passwordHash });
    if (!isValidPassword) {
        throw new AuthenticationError(
            RETURN_MESSAGES.ERR_INVALID_PASSWORD.messages,
            RETURN_MESSAGES.ERR_INVALID_PASSWORD.code
        );
    }

    const accessToken = helper.generateTokens({ username });
    await userBusiness.upsertToken({ username, accessToken });

    return { accessToken };
};
