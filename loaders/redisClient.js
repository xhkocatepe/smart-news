const redis = require('redis');
const logger = require('./../config/winston');

const client = redis.createClient();

client.on('connect', () => {
    logger.verbose('Redis Client is ready.');
});

client.on('error', (err) => {
    logger.error(`Redis Client is not ready. ${err}`);
});

module.exports = client;
