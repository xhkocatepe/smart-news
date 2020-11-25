const userNewsModel = require('../../models/userNews');

class UserNews {
    findUserNewsIdsByUsername(
        { username, isRemovedReadLater = false, limit, skip }
    ) {
        const query = { username, isRemovedReadLater };
        const project = { _id: 0, newsId: 1 };
        return userNewsModel.find(query, project)
            .sort({ _id: -1 }) // sorted latest
            .skip(skip) // Always apply 'skip' before 'limit'
            .limit(limit) // Page size
            .lean();
    }

    findUserNewsByNewsId({ username, newsId }) {
        const query = { username, newsId };
        return userNewsModel.findOne(query).lean();
    }

    createUserNews({ userNews }) {
        return userNewsModel.findOneAndUpdate({ newsId: userNews.newsId }, userNews, { upsert: true });
    }

    removeUserNewsByNewsId({ username, newsId }) {
        const query = { username, newsId };
        return userNewsModel.findOneAndUpdate(query, { isRemovedReadLater: true }).lean();
    }

    getCountUserNewsByUsername({ username, isRemovedReadLater = false }) {
        const query = { username, isRemovedReadLater };
        return userNewsModel.countDocuments(query);
    }
}

module.exports = new UserNews();
