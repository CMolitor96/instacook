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