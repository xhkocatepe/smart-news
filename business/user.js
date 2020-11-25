const UserRepository = require('../repository/persistent/user');

module.exports.isUsernameInUse = async ({ username }) => {
    const result = await UserRepository.findUserByUsername({ username });
    return !!result;
};

module.exports.create = ({ user }) => UserRepository.createUser({ user });

module.exports.getUser = ({ username }) => UserRepository.findUserByUsername({ username });

module.exports.upsertToken = ({ username }) => UserRepository.updateUserTokenWithUsername({ query: { username } });
