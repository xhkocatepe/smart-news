const kue = require('kue-scheduler');

const logger = require('../config/winston');
const newsController = require('./../controllers/news');

const Queue = kue.createQueue();

Queue.on('already scheduled', (job) => {
    logger.info(`job already scheduled${job.id}`);
});

module.exports.updateLatestNews = ({ jobName }) => {
    Queue.process(jobName, async (job, done) => {
        await newsController.updateLatestNews();
        logger.verbose(`updateLatestNews finished! ${new Date()}`);
        done();
    });
};
