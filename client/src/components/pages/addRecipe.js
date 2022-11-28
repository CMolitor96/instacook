import React from 'react';
import { useState } from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import '../../styles/test.css'
import { ADD_RECIPE } from '../../utils/mutations';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';



const styles = {
  titleInput: {
    width: '50vw'
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '5vh'
  },
  AddRecipeContainer: {
    margin: '0vh 15vw 10vh 15vw'
  },
  recipeIngredients: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '5vh'
  },
  recipeItemInput: {
    display: 'flex',
    flexDirection: 'column'
  },
  ingredientInput: {
    width: '25vw'
  },
  quantInput: {
    width: '16vw'
  },
  addRecipeTitle: {
    display: 'flex',
    justifyContent: 'center',
    margin: '5vh 0vw 10vh 0vw'
  },
  instructions: {
    margin: '15vh 0vw 3vh 0vw'
  }
}

export default function AddRecipe() {
  const [createRecipe, { error }] = useMutation(ADD_RECIPE);

  const inputArr = [
    {
      id: 1,
      size: "sm",
      value: "",
      className: "mb-3"
    }
  ];
  const token = localStorage.getItem('id_token');
  const onSubmit = async (event) => {
    event.preventDefault();
    // try {
    //   const { data } = await createRecipe({
    //     variables: {
    //       recipeName: "Fish",
    //       recipeCategory: "Dinner",
    //       recipeInstructions: "These are the steps",
    //       recipeDescription: "This is a fish recipe",
    //       recipeAuthor: Auth.getProfile().data.username,
    //       recipeIngredients: "So many ingredients in this dish",
    //       recipeImages: "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2012/5/4/1/FNM_060112-Duff-Goldman-Spanish-Style-Grilled-Fish-recipe_s4x3.jpg.rend.hgtvcom.616.462.suffix/1371606208411.jpeg",
      
    //     }
    //   })
    // } catch (e) {
    //   console.log(e);
    // }
  } 
  const [titleState, setTitleState] = useState('');
  const handleTitleChange = function(e) {
    setTitleState(e.target.value);
  };
  const [categoryState, setCategoryState] = useState('');
  const handleCategoryChange = function(e) {
    setCategoryState(e.target.value);
  };
  const [ingredientState, setingredientState] = useState('');
  const handleIngredientChange = function (e) {
    setingredientState(e.target.value);
  };


  const [arr, setArr] = useState(inputArr);

  const addInput = () => {
    setArr(s => {
      return [
        ...s,
        {
          size: "sm",
          value: "",
          className: "mb-3"
        }
      ];
    });
  };

  // const handleChange = e => {
  //   e.preventDefault();

  //   const index = e.target.id;
  //   setArr(s => {
  //     const newArr = s.slice();
  //     newArr[index].value = e.target.value;

  //     return newArr;
  //   });
  // };
  return (
    <div style={styles.AddRecipeContainer}>


      <h1 style={styles.addRecipeTitle}>Add A New Recipe</h1>
      <div style={styles.titleContainer}>
        <h3>Recipe Title:</h3>
        <InputGroup size="sm" className="mb-3" style={styles.titleInput}>
          <Form.Control
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            placeholder="Type recipe title here..."
            value={titleState}
            onChange={handleTitleChange}
          />
        </InputGroup>
      </div>
      <div>
        <h3>Recipe Description:</h3>
        <InputGroup>
          <Form.Control
            as="textarea"
            aria-label="With textarea"
            placeholder="Type recipe description here..."
          />
        </InputGroup>
      </div><br></br>
      {/* <InputGroup className="mb-3">
      <InputGroup.Text>First and last name</InputGroup.Text>
      <Form.Control aria-label="First name" />
      <Form.Control aria-label="Last name" />
    </InputGroup> */}

      <div>
      <div>
        <Button variant="primary" onClick={addInput}>+ Add Another Ingredient</Button>
        {arr.map((item, i) => {
          return (
            <div>
              <InputGroup size={item.size} className={item.className} id={i} style={styles.ingredientInput}>
                <Form.Control
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  placeholder="Type ingredient name here..."
                  value={ingredientState}
                  onChange={handleIngredientChange}
                />
              </InputGroup>

              <InputGroup size={item.size} className={item.className} id={i} style={styles.quantInput}>
                <Form.Control
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  placeholder="Type ingredient quantity here..."
                />
              </InputGroup>
            </div>
          );
        })}
      </div>

        

        <div style={styles.recipeItemInput}>
          <h5>Recipe Image:</h5>
          <InputGroup size="sm" className="mb-3" style={styles.quantInput}>
            <Form.Control
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              placeholder="Type image link here..."
            />
          </InputGroup>

        </div>
        <Form.Select aria-label="Default select example" onChange={handleCategoryChange}>
          <option>Select Recipe Category</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
        </Form.Select>
      </div>

      <div style={styles.instructions}>
        <h5>Recipe Instructions:</h5>
        <InputGroup>
          <Form.Control
            as="textarea"
            aria-label="With textarea"
            placeholder="Type cooking instructions here..."
          />
        </InputGroup>
      </div>

      <div>
        <Button variant="primary" onClick={onSubmit}>Submit Recipe</Button>
      </div>

    </div>
  );
}
