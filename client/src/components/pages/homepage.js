import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import authService from "../../utils/auth"
import cookies from '../Images/chocChunkCook.jpeg';
import taco from '../Images/bestTacos.jpeg';
import spaghetti from '../Images/spaghetti.jpeg';
import { Link, redirect } from 'react-router-dom';

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
  cardSpacing: {
    display: 'flex',
    flexDirection: 'row',
    margin: '2%'
  }
}

export default function Homepage() {
  const categoryArray = [
    { 
      id: 1,
      category: 'Italian',
      link: 'link/italian'
    },
    {
      id: 2,
      category: 'Mexican',
      link: 'link/mexican'
    },
    {
      id: 3,
      category: 'Vegetarian',
      link: 'link/vegetarian'
    }
  ]
  const recipeArray = [
    {
      id: 1,
      image: spaghetti,
      recipeTitle: 'Spaghetti and Meatballs',
      description: 'Delicious spaghetti made with traditional marinara sauce and ground beef meatballs. Everyone at the table enjoys this dish.',
      link: 'spaghetti/link'
    },
    {
      id: 2,
      image: taco,
      recipeTitle: 'Best Tacos',
      description: 'Carne asada has a lot of flavor and topped with a generous portion of guacamole and pico de gallo in 2 corn tortillas.',
      link: 'taco/link'
    },
    {
      id: 3,
      image: cookies,
      recipeTitle: 'Chocolate Chunk Cookies',
      description: 'Simple, straightforward, amazingly delicious, doughy yet still fully cooked, chocolate chip cookie that turns out perfectly every single time!',
      link: 'cookies/link'
    }
  ]

  const loggedIn = authService.loggedIn()
 if (!loggedIn) {
  console.log('you are not logged in. redirecting...')
  redirect("/login")};

  return (
    <div style={styles.page}>
 {!loggedIn ? <p>Not logged in</p>: (<> <aside style={styles.aside}>
        <h3>Filter</h3>
        <ul style={styles.asideItems}>
          {categoryArray.map((item) => {
            return (
              <li key={item.id}>
                <a
                  target='_blank'
                  href={item.link}
                  rel="noreferrer" key={item.id}>
                  {item.category}
                </a>
              </li>
            );
          })}
        </ul>
      </aside>

      <div>
        <h1 style={styles.pageTitle}>Today's Top Recipes</h1>
        {recipeArray.map((recipe, index) => {
          return (
            <Card key={`${recipe.recipeTitle}${index}`} style={styles.cardSpacing}>
              <Card.Img style={styles.recipeImage} variant="top" src={recipe.image} />
              <Card.Body>
                <Card.Title>{recipe.recipeTitle}</Card.Title>
                <Card.Text>
                  {recipe.description}
                </Card.Text>
                <Link to={`/recipe/${recipe.id}`}>
                <Button variant="primary">Go To Recipe</Button>
                </Link>
              </Card.Body>
            </Card>
          );
        })}
      </div></>)}
      
      
    </div>
  );
}