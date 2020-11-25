const mongoose = require('mongoose');
const { RSS_SOURCE } = require('../utils/constants');

const { Schema } = mongoose;

const NewsSchema = new Schema(
    {
        link: {
            type: String,
            required: true,
        },
        title: {
            type: String,
        },
        pubDate: {
            type: Date,
        },
        source: {
            type: String,
            enum: [Object.values(RSS_SOURCE)],
            required: true,
        },
    },
    { timestamps: true }
);

/**
 * Indexes
 */
NewsSchema.index({ link: 1 });
NewsSchema.index({ source: 1 });
NewsSchema.index({ pubDate: 1 });

module.exports = NewsSchema;
