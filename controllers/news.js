const logger = require('../config/winston');

const newsBusiness = require('./../business/news');
const { DEFAULT_PAGINATION } = require('../utils/constants');

module.exports.getNews = async (
    { source, page = DEFAULT_PAGINATION.PAGE, limit = DEFAULT_PAGINATION.LIMIT }, { username }
) => {
    const result = await newsBusiness.getPaginatedNews({ source, page, limit, username });

    return result;
};

module.exports.updateLatestNews = async () => {
    let feedItems = [];
    feedItems = await newsBusiness.getLatestNewsFromRSSSources();
    // Order type must be asc, while saving db
    feedItems.sort((news1, news2) => (new Date(news1.pubDate) - new Date(news2.pubDate)));

    let feedItemsWithNewsId = [];

    try {
        feedItemsWithNewsId = await newsBusiness.savePersistentDB({ items: feedItems });
    } catch (error) {
        logger.error('Error occurred when saving feeds to DB', error);
    }

    try {
        await newsBusiness.saveCacheDB({ items: feedItemsWithNewsId });
    } catch (error) {
        logger.error('Error occurred when saving feeds to DB', error);
    }
};
