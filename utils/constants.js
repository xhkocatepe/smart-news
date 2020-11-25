module.exports.NODE_ENVIRONMENTS = {
    PRODUCTION: 'production',
    DEVELOPMENT: 'development',
    TEST: 'test',
};

module.exports.REPO_LANGUAGE = {
    JAVASCRIPT: 'JavaScript',
    PHP: 'PHP',
};

module.exports.MONGOOSE_CONNECTION_STATES = {
    CONNECTED: 1,
    DISCONNECTED: 0,
};

module.exports.MONGOOSE_CONNECTION_PARAMS = {
    RETRY_COUNT: 3,
    SERVER_SELECTION_TIMEOUT: 5000,
    CONNECT_TIMEOUT: 5000,
    POOL_SIZE: 20,
};

module.exports.MOMENT_ISTANBUL_TIMEZONE = 'Europe/Istanbul';

module.exports.RSS_SOURCE = {
    YAHOO: 'yahoo',
    NY_TIMES: 'ny_times',
};

module.exports.DEFAULT_CACHE_TTL_FOR_NEWS_AS_SECONDS = 20 * 60; // 20 minutes

module.exports.ACCESS_TOKEN_EXPIRATION = 2592000; // 30 days in Seconds

module.exports.JOB_SCHEDULER_NAME = {
    UPDATE_LATEST_NEWS: 'updateLatestNews',
};

module.exports.DEFAULT_LIMIT_FOR_ALL_NEWS = 0;
module.exports.DEFAULT_SKIP_FOR_ALL_NEWS = 0;

module.exports.DEFAULT_PAGINATION = {
    LIMIT: 50,
    PAGE: 1,
};
module.exports.DEFAULT_SKIP = 1;
