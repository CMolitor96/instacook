import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
    query getUsers {
        users {
            _id
            username
            recipes {
              _id
              recipeName
              recipeDescription
              recipeCategory
              recipeAuthor
              recipeIngredients
              recipeInstructions
              recipeImages
              createdAt
              comments {
                _id
                commentAuthor
                commentText
                createdAt
              }
            }
        }
    }
`;

export const GET_USER = gql`
query User($id: String!) {
  user(_id: $id) {
    _id
    username
    recipes {
      _id
      recipeName
      recipeCategory
      recipeAuthor
      createdAt
      recipeDescription
      recipeIngredients
      recipeInstructions
      recipeImages
      comments {
        _id
        commentAuthor
        commentText
        createdAt
      }
    }
  }
}
`;

export const ME = gql`
query me {
  me {
    _id
    username
    email
    recipes {
      _id
      recipeName
      recipeAuthor
      createdAt
      recipeCategory
      recipeIngredients
      recipeDescription
      recipeInstructions
      recipeImages
      comments {
        _id
        commentAuthor
        commentText
        createdAt
      }
    }
  }
}
`;

export const ALL_RECIPES = gql`
query allRecipes {
  recipes {
    _id
    recipeName
    recipeCategory
    recipeAuthor
    createdAt
    recipeDescription
    recipeIngredients
    recipeInstructions
    recipeImages
    comments {
      _id
      commentAuthor
      commentText
      createdAt
    }
  }
}
`;

export const RECIPE_CATEGORY = gql`
query recipeCategory($recipeCategory: String!) {
  recipeCategory(recipeCategory: $recipeCategory) {
    _id
    recipeName
    recipeAuthor
    createdAt
    recipeCategory
    recipeIngredients
    recipeDescription
    recipeInstructions
    recipeImages
    comments {
      _id
      commentAuthor
      commentText
      createdAt
    }
  }
}
`;