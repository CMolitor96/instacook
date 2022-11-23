const User = require('../models/user');
const Recipe = require('../models/recipe');
const Comment = require('../models/comment');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');


const resolvers = {
    Query: {
        users: async () => {
            let users = await User.find().populate({path: 'recipes', populate: {path: 'comments'}});
            return users;
        },
        user: async (parent, {_id}, context) => {
            let user = await User.findById(_id).populate({path: 'recipes', populate: {path: 'comments'}});
            return user;
        },
        me: async (parent, args, context) => {
            if (context.user) {
              let me = await User.findOne({ _id: context.user._id }).populate({path: 'recipes', populate: {path: 'comments'}});
              return me;
            }
            throw new AuthenticationError('You need to be logged in!');
          },
        recipes: async () => {
            let recipes = await Recipe.find().populate('comments');
            return recipes;
        },
        recipe: async (parent, { _id }, context) => {
            let recipe = await Recipe.findById(_id).populate('comments');
            return recipe;
        },
        recipeCategory: async (parent, { recipeCategory }, context ) => {
            let filteredRecipes = await Recipe.find({recipeCategory: recipeCategory}).populate('comments');
            return filteredRecipes;
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
        addRecipe: async (parent, { recipeName, recipeCategory, recipeDescription, recipeIngredients, recipeInstructions, recipeImages }, context) => {
            if (context.user) {
                const recipe = await Recipe.create({
                    recipeName: recipeName, 
                    recipeCategory: recipeCategory,
                    recipeDescription: recipeDescription,
                    recipeAuthor: context.user.username,
                    recipeIngredients: recipeIngredients,
                    recipeInstructions: recipeInstructions,
                    recipeImages: recipeImages
                });

               const user = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    { $addToSet: { recipes: recipe._id}},
                    {new: true}
                );

                return recipe;
            }
            throw new AuthenticationError('You need to be logged in');
        },
        addComment: async (parent, { recipeId, commentText }, context) => {
            if (context.user) {
                const comment = await Comment.create(
                    {commentText: commentText,
                    commentAuthor: context.user.username
                    }
                    // commentAuthor: context.user.username,
                    //remember to remove commentAuthor from typedefs too
                );
                const recipe = await Recipe.findOneAndUpdate(
                    {_id: recipeId},
                    { $addToSet: {comments: comment._id}},
                    {
                        new: true,
                        runValidators: true,
                    }   
                );
                return recipe.populate('comments');
            }
            throw new AuthenticationError("You need to be logged in");  
        },
        removeRecipe: async (parent, {recipeId}, context) => {
            if (context.user) {
                const recipe = await Recipe.findById(recipeId).populate('comments');
                // console.log(recipe);
                // console.log(recipe.comments);
                for (let i = 0; i < recipe.comments.length; i++) {
                    // console.log(recipe.comments[i]._id);
                    await Comment.findByIdAndDelete(recipe.comments[i]._id)
                }
                const deleteRecipe = await Recipe.findByIdAndDelete(recipeId);
                const user = await User.findOneAndUpdate(
                    {username: recipe.recipeAuthor},
                    { $pull: {recipes: {_id: recipeId } } },
                    { new: true }
                    );
                return deleteRecipe;
            }
            throw new AuthenticationError("You need to be logged in");
        }
    }
};

module.exports = resolvers;