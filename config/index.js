const { RSS_SOURCE } = require('../utils/constants');

module.exports = {
    MONGO: {
        DB: process.env.DB,
    },
    RSS_SOURCES: [{
        NAME: RSS_SOURCE.YAHOO,
        URL: process.env.YAHOO_RSS_URL,
    },
    {
        NAME: RSS_SOURCE.NY_TIMES,
        URL: process.env.NY_TIMES_RSS_URL,
    }],
    JWT_SECRET: process.env.JWT_SECRET,
    CRON_EXPR_FOR_LATEST_UPDATE_NEWS: process.env.CRON_EXPR_FOR_LATEST_UPDATE_NEWS,
};
