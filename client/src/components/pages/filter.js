import React from 'react';
import { useQuery } from '@apollo/client';

import { RECIPE_CATEGORY } from '../../utils/queries';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import authService from "../../utils/auth"

// import cookies from '../Images/chocChunkCook.jpeg';
// import taco from '../Images/bestTacos.jpeg';
// import spaghetti from '../Images/spaghetti.jpeg';
import { redirect, useParams } from 'react-router-dom';

const styles = {
  page: {
    display: 'flex',
    flexDirection: 'row',
    marginRight: '2vw'
  },
  aside: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '2%',
    borderLeft: '0',
    borderTop: '0',
    borderBottom: '0',
    borderRight: '0.5px',
    borderStyle: 'solid'
  },
  asideItems: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: '1vw',
    marginLeft: '0',
    listStyle: 'none'
  },
  pageTitle: {
    margin: '2%'
  },
  recipeImage: {
    width: '20vw',
    height: '20vh',
    objectFit: 'cover'
  },
  cardBody: {
    backgroundColor: '#222327',
    color: 'white'
  },
  cardSpacing: {
    display: 'flex',
    flexDirection: 'row',
    margin: '2%'
  }
}

export default function Filter() {


  const loggedIn = authService.loggedIn()
  if (!loggedIn) {
    console.log('you are not logged in. redirecting...')
    redirect("/login")
  };
  const { filter } = useParams();
  const { loading, data } = useQuery(RECIPE_CATEGORY, {
    variables: { recipeCategory: filter },
  });
console.log(filter);
console.log(data);


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 style={styles.pageTitle}>{filter}</h1>
      {data.recipeCategory.map((recipe, index) => {
        return (
          <Card key={`${recipe.recipeTitle}${index}`} style={styles.cardSpacing}>
            <Card.Img style={styles.recipeImage} variant="top" src={recipe.recipeImages} />
            <Card.Body style={styles.cardBody}>
              <Card.Title>{recipe.recipeName}</Card.Title>
              <Card.Text>
                {recipe.recipeDescription}
              </Card.Text>
              <Button variant="primary">Go To Recipe</Button>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
}