const { Schema, model } = require('mongoose');
const getDate = require('../utils/dateFormat');

const commentSchema = new Schema({
    commentText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280,
        trim: true,
    },
    commentAuthor: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => getDate(timestamp),
    },
});

const Comment = model('Comment', commentSchema);
module.exports = Comment;