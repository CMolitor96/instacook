const db = require('../config/connection');
const Recipe = require('../models/recipe');
const User = require('../models/user');
const recipeData = require('./recipeData.json');
const userData = require('./userData.json');

db.once('open', async () => {
    try {
        await User.deleteMany({});
        await Recipe.deleteMany({});

        await User.create(userData);

        for (let i = 0; i < recipeData.length; i++) {
            const { _id, recipeAuthor } = await Recipe.create(recipeData[i]);
            const user = await User.findOneAndUpdate(
                { username: recipeAuthor },
                {
                    $addToSet: {
                        recipes: _id,
                    },
                }
            )
        }

    } catch (err) {
        console.error(err);
        process.exit(1);
    }

    console.log("All data seeded!");
    process.exit(0);

});
  