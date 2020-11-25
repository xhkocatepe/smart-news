const UserNewsRepository = require('../repository/persistent/userNews');
const NewsRepository = require('../repository/persistent/news');

module.exports.getPaginatedReadLaterNews = async ({ page, limit, username }) => {
    const results = { next: null, previous: null, news: [] };

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const count = await UserNewsRepository.getCountUserNewsByUsername({ username, isRemovedReadLater: false });
    const newsIdsArrayObject = await UserNewsRepository.findUserNewsIdsByUsername(
        { username, isRemovedReadLater: false, limit, skip: startIndex }
    );
    const newsIds = newsIdsArrayObject.map((item) => item.newsId);

    const userNews = await NewsRepository.findNewsByNewsId({ newsIds });

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

    results.news = userNews;

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
