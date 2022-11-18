import { gql } from '@apollo/client';

export const ADD_RECIPE = gql`
    mutation addRecipe($recipeName: String!, $recipeCategory: String!, $recipeDescription: String!, $recipeIngredients: String!, $recipeImages: String) {
        addRecipe(recipeName: $recipeName, recipeCategory: $recipeCategory, recipeDescription: $recipeDescription, recipeIngredients: $recipeIngredients, recipeImages: $recipeImages) {
        _id
        recipeName
        recipeCategory
        recipeDescription
        recipeAuthor
        recipeIngredients
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
`;