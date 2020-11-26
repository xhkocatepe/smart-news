const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        passwordHash: {
            type: String,
            required: true,
        },
        passwordSalt: {
            type: String,
            required: true,
        },
        token: {
            type: String,
        },
        lastReadPubDate: {
            type: String,
        },

    },
    { timestamps: true }
);

/**
 * Indexes
 */
UserSchema.index({ username: 1 });

module.exports = UserSchema;
