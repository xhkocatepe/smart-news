const { promisify } = require('util');
const redisClient = require('../../loaders/redisClient');

const setAsync = promisify(redisClient.set).bind(redisClient);
const getAsync = promisify(redisClient.get).bind(redisClient);
const delAsync = promisify(redisClient.del).bind(redisClient);
const mgetAsync = promisify(redisClient.mget).bind(redisClient);
const keysAsync = promisify(redisClient.keys).bind(redisClient);

module.exports.save = ({ key, data, TTL }) => setAsync(key, data, 'EX', TTL);

module.exports.get = async ({ key }) => getAsync(key);

module.exports.del = async ({ key }) => delAsync(key);

module.exports.getMultiple = async ({ keys }) => mgetAsync(keys);

module.exports.keys = async ({ key }) => keysAsync(key);

module.exports.isAlive = () => redisClient.connected;
