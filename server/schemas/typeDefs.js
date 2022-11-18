const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
        recipes: [Recipe]!
    }

    type Recipe {
        _id: ID
        recipeName: String
        recipeCategory: String
        recipeDescription: String
        recipeAuthor: String
        recipeIngredients: String
        createdAt: String
        recipeImages: String
        comments: [Comment!]!
    }

    type Comment {
        _id: ID
        commentText: String
        commentAuthor: String
        createdAt: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        users: [User]!
        user(username: String!): User
        me: User
        recipes: [Recipe]!
        recipe(recipeName: String!): Recipe
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        addRecipe(recipeName: String!, recipeCategory: String!, recipeDescription: String!, recipeIngredients: String!, recipeImages: String): Recipe
        addComment(recipeId: ID!, commentText: String!, commentAuthor: String!): Recipe
    }
`;

module.exports = typeDefs;