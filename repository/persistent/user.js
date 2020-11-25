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

    updateUserLastReadNewsId({ username, lastReadNewsId }) {
        return userModel.findOneAndUpdate({ username }, { lastReadNewsId }).lean();
    }
}

module.exports = new User();
