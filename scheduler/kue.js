const kue = require('kue-scheduler');
const moment = require('moment-timezone');
const worker = require('./worker');
const logger = require('../config/winston');
const config = require('../config');

const CONSTANTS = require('../utils/constants');

const Queue = kue.createQueue();

module.exports.updateLatestNews = () => {
    const jobName = CONSTANTS.JOB_SCHEDULER_NAME.UPDATE_LATEST_NEWS;
    const job = Queue
        .createJob(jobName, { timezone: CONSTANTS.MOMENT_ISTANBUL_TIMEZONE })
        .attempts(3);

    Queue.every(config.CRON_EXPR_FOR_LATEST_UPDATE_NEWS, job);

    worker.updateLatestNews({ jobName });
};
