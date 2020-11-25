const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserNewsSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
        },
        newsId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'News',
            required: true,
            unique: true,
        },
        isRemovedReadLater: {
            type: Boolean,
        },
    },
    { timestamps: true }
);

/**
 * Indexes
 */
UserNewsSchema.index({ username: 1 });
UserNewsSchema.index({ isRemovedReadLater: 1 });

module.exports = UserNewsSchema;
