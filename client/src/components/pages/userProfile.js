import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ME } from '../../utils/queries';
import { REMOVE_RECIPE } from '../../utils/mutations';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';


const styles = {
  page: {
    display: 'flex',
    flexDirection: 'row',
    marginRight: '2vw'
  },
  pageTitle: {
    margin: '2%',
    textAlign: 'center',
  },
  recipeImage: {
    width: '20vw',
    height: '20vh',
    objectFit: 'cover'
  },
  cardSpacing: {
    display: 'flex',
    flexDirection: 'row',
    margin: '2%',
    justifyContent: 'center'
  }
}

export default function UserProfile() {
  const { loading, data } = useQuery(ME);
  // eslint-disable-next-line
  const [removeRecipe, { error, recipeData }] = useMutation(REMOVE_RECIPE);
  const handleDelete = async (event) => {
    event.preventDefault();
    console.log(event.target.id);
    try {
      // eslint-disable-next-line
      const {data} = await removeRecipe({
        variables: {recipeId: event.target.id}
      });
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <div style={styles.page}>

      <div>
        <h1 style={styles.pageTitle}>My Recipes</h1>
        {data.me.recipes.map((recipe) => {
          return (
            <Card style={styles.cardSpacing} key={recipe._id}>
              <Card.Img style={styles.recipeImage} variant="top" src={recipe.recipeImages} alt={recipe.recipeName}/>
              <Card.Body>
                <Card.Title>{recipe.recipeName}</Card.Title>
                <Card.Text>
                  {recipe.recipeDescription}
                </Card.Text>
                {/* <Button variant="primary">Go To Recipe</Button> */}
                <Link className="btn btn-primary" to={`/recipe/${recipe._id}`}>Go To Recipe</Link>
                <Card.Text>Comments: {recipe.comments.length}</Card.Text>
                <Card.Text>Created At: {recipe.createdAt}</Card.Text>
                <Button variant="danger" id={recipe._id} onClick={handleDelete}>Delete this Recipe</Button>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
}