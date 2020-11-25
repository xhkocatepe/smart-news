const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const cookieParser = require('cookie-parser');
const validator = require('express-validator');
require('dotenv-flow').config();
const logger = require('./config/winston');
const routeLoader = require('./loaders/route');
const redisServer = require('./loaders/redisServer');
const redisClient = require('./loaders/redisClient');

const schedulerAllPackageUpdates = require('./scheduler/kue');
const winstonLogger = require('./config/winston');

const mongooseLoader = require('./loaders/mongoose');
const localizationMiddleware = require('./middlewares/localization');
const errorHandlerMiddleware = require('./middlewares/errorHandler');
const { NotFoundError } = require('./utils/customError');
const { ERR_NOTFOUND } = require('./utils/messages').RETURN_MESSAGES;

const app = express();

logger.verbose(`environment: ${process.env.NODE_ENV}`);

redisServer();
mongooseLoader.init();

schedulerAllPackageUpdates.updateLatestNews();

app.use(morgan('dev', { stream: winstonLogger.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
app.use(cors());
app.use(localizationMiddleware());
app.use(express.static('public'));
app.set('view engine', 'ejs');

routeLoader(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(new NotFoundError(ERR_NOTFOUND.messages, ERR_NOTFOUND.code));
});

// error handler
app.use(errorHandlerMiddleware);

module.exports = app;
