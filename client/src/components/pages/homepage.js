import React from 'react';
import { Link } from 'react-router-dom';
import { redirect } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { ALL_RECIPES } from '../../utils/queries';
import authService from "../../utils/auth"

import Card from 'react-bootstrap/Card';
import '../../styles/test.css'


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
    alignContent: 'space-around',
    listStyle: 'none'
  },
  listItems: {
    margin: '1vh'
  },
  listButton: {
    width: '10vw'
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

export default function Homepage() {


  const loggedIn = authService.loggedIn()
  if (!loggedIn) {
    console.log('you are not logged in. redirecting...')
    redirect("/login")
  };

  const { loading, data } = useQuery(ALL_RECIPES);



  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <div style={styles.page}>
      {!loggedIn ? <p>Not logged in</p> : (<> <aside style={styles.aside}>
        <h3>Filter</h3>
        <ul style={styles.asideItems}>
          <li style={styles.listItems}>
            <Link style={styles.listButton} className='btn btn-primary button' to={`/homepage/Breakfast`}>Breakfast</Link>
          </li>
          <li style={styles.listItems}>
            <Link style={styles.listButton} className='btn btn-primary button' to={`/homepage/Lunch`}>Lunch</Link>
          </li>
          <li style={styles.listItems}>
            <Link style={styles.listButton} className='btn btn-primary button' to={`/homepage/Dinner`}>Dinner</Link>
          </li>
        </ul>
      </aside>

        <div>
          <h1 style={styles.pageTitle}>Today's Top Recipes</h1>
          {data.recipes.map((recipe, index) => {
            return (
              <Card key={`${recipe.recipeTitle}${index}`} style={styles.cardSpacing}>
                <Card.Img style={styles.recipeImage} variant="top" src={recipe.recipeImages} />
                <Card.Body style={styles.cardBody}>
                  <Card.Title>{recipe.recipeName}</Card.Title>
                  <Card.Text>
                    {recipe.recipeDescription}
                  </Card.Text>
                  <Link className="btn btn-primary" to={`/recipe/${recipe._id}`}>Go To Recipe</Link>
                </Card.Body>
              </Card>
            );
          })}
        </div></>)}


    </div>
  );
}