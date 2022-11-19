const { Schema, model } = require('mongoose');
const getDate = require('../utils/dateFormat');

const recipeSchema = new Schema({
    recipeName: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280,
        trim: true,
    },
    recipeCategory: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280,
        trim: true,
    },
    recipeDescription: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 540,
        trim: true,
    },
    recipeAuthor: {
        type: String,
        required: true,
    },
    recipeIngredients: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => getDate(timestamp),
    },
    recipeImages: [
        {
            data: Buffer,
            contentType: String,
        }
    ],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment',
        }
    ],
});

const Recipe = model('Recipe', recipeSchema);
module.exports = Recipe;