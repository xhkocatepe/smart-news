const userModel = require('../../models/user');

class User {
    findUserByUsername({ username }) {
        const query = { username };
        return userModel.findOne(query).lean();
    }

    createUser({ user }) {
        return userModel.create(user);
    }

    updateUserTokenWithUsername({ username, token }) {
        return userModel.findOneAndUpdate({ username }, { token }).lean();
    }

    updateUserLastReadNewsId({ username, lastReadPubDate }) {
        return userModel.findOneAndUpdate({ username }, { lastReadPubDate }).lean();
    }
}

module.exports = new User();
