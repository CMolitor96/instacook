const User = require('../models/user');
const Recipe = require('../models/recipe');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');


const resolvers = {
    Query: {
        users: async () => {
            return User.find().populate('recipes');
        },
        user: async (parent, { username }) => {
            return User.findOne({ username }).populate('recipes');
        },
        me: async (parent, args, context) => {
            if (context.user) {
              return User.findOne({ _id: context.user._id }).populate('thoughts');
            }
            throw new AuthenticationError('You need to be logged in!');
          },
        recipes: async () => {
            return Recipe.find();
        },
        recipe: async (parent, { recipeName }) => {
            return Recipe.findOne({recipeName}).populate('comments');
        },
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw new AuthenticationError('No user found with this email address');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const token = signToken(user);
      
            return { token, user };
        },
        addRecipe: async (parent, { recipeName, recipeCategory, recipeDescription, recipeIngredients }, context) => {
            if (context.user) {
                const recipe = await Recipe.create({
                    recipeName, 
                    recipeCategory,
                    recipeDescription,
                    recipeAuthor: context.user.username,
                    recipeIngredients
                });

                await User.findOneAndUpdate(
                    {_id: context.user._id},
                    { $addToSet: { recipes: recipe._id}}
                );

                return recipe;
            }
            throw new AuthenticationError('You need to be logged in');
        },
        addComment: async (parent, { recipeId, commentText }, context) => {
            if (context.user) {
                const comment = await Comment.create({
                    commentText,
                    commentAuthor: context.user.username,
                });
                await Recipe.findOneAndUpdate(
                    {_id: recipeId},
                    {
                        $addToSet: {
                            comments: { comments: comment._id},
                        },
                    },
                    {
                        new: true,
                        runValidators: true,
                    }
                );
            }
            throw new AuthenticationError("You need to be logged in");
        },
    }
};

module.exports = resolvers;