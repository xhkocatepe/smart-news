const mongoose = require('mongoose');
const UserNewsSchema = require('../schemas/userNews');

const UserNews = mongoose.model('UserNews', UserNewsSchema);

module.exports = UserNews;
