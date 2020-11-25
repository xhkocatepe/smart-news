const UserNewsRepository = require('../repository/persistent/userNews');

module.exports.getPaginatedReadLaterNews = async ({ page, limit, username }) => {
    const results = { next: null, previous: null, news: [] };

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const count = await UserNewsRepository.getCountUserNewsByUsername({ username, isRemovedReadLater: false });
    const news = await UserNewsRepository.findUserNewsByUsername(
        { username, isRemovedReadLater: false, limit, skip: startIndex }
    );

    if (endIndex < count) {
        results.next = {
            page: page + 1,
            limit,
        };
    }
    if (startIndex > 0) {
        results.previous = {
            page: page - 1,
            limit,
        };
    }

    results.news = news;

    return results;
};

module.exports.saveReadLaterNews = async ({ username, newsId }) => {
    const userNews = {
        username,
        newsId,
        isRemovedReadLater: false,

    };
    await UserNewsRepository.createUserNews({ userNews });
};

module.exports.removeReadLaterNews = (
    { username, newsId }
) => UserNewsRepository.removeUserNewsByNewsId({ username, newsId });

module.exports.checkUserNewsByNewsId = ({ username, newsId }) => UserNewsRepository.findUserNewsByNewsId({ username, newsId });
