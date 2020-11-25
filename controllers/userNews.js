const userNewsBusiness = require('./../business/usernews');
const { BadRequestError } = require('./../utils/customError');
const { RETURN_MESSAGES } = require('./../utils/messages');
const { DEFAULT_PAGINATION } = require('./../utils/constants');

module.exports.getReadLaterNews = (
    { page = DEFAULT_PAGINATION.PAGE, limit = DEFAULT_PAGINATION.LIMIT }, { username }
) => userNewsBusiness.getPaginatedReadLaterNews({ page, limit, username });

module.exports.saveReadLaterNews = async ({ newsId }, { username }) => {
    const userNews = await userNewsBusiness.checkUserNewsByNewsId({ newsId, username });
    if (userNews && !userNews.isRemovedReadLater) {
        throw new BadRequestError(
            RETURN_MESSAGES.USER_NEWS_ALREADY_EXISTS.messages,
            RETURN_MESSAGES.USER_NEWS_ALREADY_EXISTS.code
        );
    }
    await userNewsBusiness.saveReadLaterNews({ newsId, username });
};

module.exports.removeReadLaterNews = async ({ newsId }, { username }) => {
    const userNews = await userNewsBusiness.checkUserNewsByNewsId({ newsId, username });

    if (!userNews || userNews.isRemovedReadLater) {
        throw new BadRequestError(
            RETURN_MESSAGES.NO_USER_NEWS_FOR_REMOVE.messages,
            RETURN_MESSAGES.NO_USER_NEWS_FOR_REMOVE.code
        );
    }

    const removedNews = await userNewsBusiness.removeReadLaterNews({ newsId, username });

    if (removedNews.nModified) {
        throw new BadRequestError(
            RETURN_MESSAGES.FAILED_REMOVED_READ_LATER.messages,
            RETURN_MESSAGES.FAILED_REMOVED_READ_LATER.code
        );
    }
};
