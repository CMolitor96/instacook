import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_RECIPE = gql`
mutation addRecipe($recipeName: String!, $recipeCategory: String!, $recipeInstructions: String!, $recipeDescription: String!, $recipeIngredients: String!, $recipeImages: [String]) {
    addRecipe(recipeName: $recipeName, recipeCategory: $recipeCategory, recipeInstructions: $recipeInstructions, recipeDescription: $recipeDescription, recipeIngredients: $recipeIngredients, recipeImages: $recipeImages) {
      _id
      createdAt
      recipeAuthor
      recipeCategory
      recipeDescription
      recipeImages
      recipeIngredients
      recipeInstructions
      recipeName
    }
  }
`;

export const ADD_COMMENT = gql`
mutation addComment($recipeId: ID!, $commentText: String!) {
    addComment(recipeId: $recipeId, commentText: $commentText) {
      recipeName
      recipeAuthor
      createdAt
      _id
      comments {
        createdAt
        commentText
        commentAuthor
        _id
      }
    }
  }
`;

export const REMOVE_RECIPE = gql`
mutation removeRecipe($recipeId: ID!) {
    removeRecipe(recipeId: $recipeId) {
      recipeName
    }
  }
`;