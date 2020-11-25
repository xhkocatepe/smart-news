const _ = require('lodash');
const RssParser = require('rss-parser');

const logger = require('../config/winston');
const cacheRepo = require('../repository/cache/cache');
const CONSTANTS = require('../utils/constants');
const CONFIG = require('../config');

const newsRepository = require('../repository/persistent/news');
const userRepository = require('../repository/persistent/user');

const rssParser = new RssParser();


module.exports.getLatestNewsFromRSSSources = async () => {
    let uniformFeedItems = [];
    for await (const rssSource of CONFIG.RSS_SOURCES) {
        try {
            const feed = await rssParser.parseURL(rssSource.URL);
            const feedAssignedObject = Object.assign({}, feed);
            delete feedAssignedObject.items;
            const uniformItems = this.uniformFeedItems(
                { items: feed.items, source: rssSource.NAME, feedInfo: feedAssignedObject }
            );
            uniformFeedItems = uniformFeedItems.concat(uniformItems);
        } catch (e) {
            logger.error(`Error occurred getting latest news from source: ${rssSource.NAME}`);
        }
    }

    return uniformFeedItems;
};
module.exports.saveCacheDB = async ({ items }) => {
    for await (const item of items) {
        // if cache is alive, then save to cacheRepo db
        if (cacheRepo.isAlive()) {
            const prefixKey = `rss:${item.source}:${item.link}`;
            const newsCache = await cacheRepo.get({ key: prefixKey });
            if (!newsCache) {
                const ttl = item.feedInfo.ttl ? parseInt(item.feedInfo.ttl) * 600 :
                    CONSTANTS.DEFAULT_CACHE_TTL_FOR_NEWS_AS_SECONDS; // dynamic cache
                // if there is no newsId on item, get news Id from persistent
                item.newsId = item.newsId ||
                    await newsRepository.findNewsIdByLink({ link: item.link });

                await cacheRepo.save({ key: prefixKey, data: JSON.stringify(item), TTL: ttl });
            }
        }
    }
};

module.exports.savePersistentDB = ({ items }) => {
    delete items.feedInfo; // do not need to save info on persistent db
    return newsRepository.bulkWrite({ items });
};

module.exports.uniformFeedItems = ({ items, source, feedInfo }) => items.map((item) => ({
    link: item.link,
    title: item.title,
    pubDate: item.isoDate,
    source,
    feedInfo,
}));

module.exports.getPaginatedNews = async ({ page, limit, source, username }) => {
    const results = { next: null, previous: null, news: [] };

    let paginatedNews = [];
    let count = 0;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    // priority for username
    if (username) {
        ({ paginatedNews, count } = await this.getNewsFromPersistent({ source, startIndex, limit, username }));
    } else if (cacheRepo.isAlive()) { // Cache or Persistent
        ({ paginatedNews, count } = await this.getNewsFromCache({ source, startIndex, endIndex, limit }));
    } else {
        ({ paginatedNews, count } = await this.getNewsFromPersistent({ source, startIndex, limit }));
    }

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

    results.news = paginatedNews;

    return results;
};

module.exports.getNewsFromCache = async ({ source, startIndex, endIndex, limit }) => {
    // let paginatedNews;
    // let count;
    const keysPrefix = `rss:${source || ''}*`;
    const keys = await cacheRepo.keys({ key: keysPrefix }) || [];

    // Cache is empty, go to Persistent DB!
    if (!keys.length) {
        return this.getNewsFromPersistent({ source, startIndex, limit });
    }

    const feedItemsFromCache = await cacheRepo.getMultiple({ keys }) || [];
    const feedItems = feedItemsFromCache.map((_item) => JSON.parse(_item));
    // Sort
    feedItems.sort((news1, news2) => (new Date(news2.pubDate) - new Date(news1.pubDate)));

    const paginatedNews = feedItems.slice(startIndex, endIndex);
    const count = feedItems.length;


    return { paginatedNews, count };
};

module.exports.getNewsFromPersistent = async ({ source, startIndex, limit, username }) => {
    let newsId;
    if (username) {
        const user = await userRepository.findUserByUsername({ username });
        newsId = user.lastReadNewsId;
    }
    const paginatedNews = await newsRepository.findFilteredNews({ source, newsId, limit, skip: startIndex });

    const count = await newsRepository.getCountFilteredNews({ source, newsId });

    // Update last read newsId on user
    if (username && paginatedNews.length) {
        await userRepository.updateUserLastReadNewsId({ username, lastReadNewsId: paginatedNews[0]._id });
    }

    return { paginatedNews, count };
};
