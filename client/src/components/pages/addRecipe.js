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
  // eslint-disable-next-line
  const [createRecipe, { error }] = useMutation(ADD_RECIPE);
  const [titleState, setTitleState] = useState('');
  const handleTitleChange = function(e) {
    setTitleState(e.target.value);
  };
  const [descriptionState, setDescriptionState] = useState('');
  const handleDescriptionChange = function(e) {
    setDescriptionState(e.target.value);
  };
  const [categoryState, setCategoryState] = useState('');
  const handleCategoryChange = function(e) {
    setCategoryState(e.target.value);
  };
  const [ingredientState, setingredientState] = useState('');
  const handleIngredientChange = function (e) {
    setingredientState(e.target.value);
  };
  const [instructionState, setInstructionState] = useState('');
  const handleInstructionChange = function(e) {
    setInstructionState(e.target.value);
  };
  const [imageState, setImageState] = useState('');
  const handleImageChange = function(e) {
    setImageState(e.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      //eslint-disable-next-line
      const { data } = await createRecipe({
        variables: {
          recipeName: titleState,
          recipeCategory: categoryState,
          recipeInstructions: instructionState,
          recipeDescription: descriptionState,
          recipeAuthor: Auth.getProfile().data.username,
          recipeIngredients: ingredientState,
          recipeImages: imageState,
        }
      })
    } catch (e) {
      console.log(e);
    }
    setTitleState('');
    setDescriptionState('');
    setCategoryState('');
    setInstructionState('');
    setingredientState('');
    setImageState('');
  } 

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
            value={descriptionState}
            onChange={handleDescriptionChange}
          />
        </InputGroup>
      </div><br></br>

          <div>
        <h3>Recipe Ingredients:</h3>
        <InputGroup>
          <Form.Control
            as="textarea"
            aria-label="With textarea"
            placeholder="Type recipe ingredients and quantities here..."
            value={ingredientState}
            onChange={handleIngredientChange}
          />
        </InputGroup>
      </div><br></br>

      <div>

        

        <div style={styles.recipeItemInput}>
          <h3>Recipe Image:</h3>
          <InputGroup size="sm" className="mb-3" style={styles.quantInput}>
            <Form.Control
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              placeholder="Paste image link here..."
              value={imageState}
              onChange={handleImageChange}
            />
          </InputGroup>

        </div>
        <h3>Recipe Category:</h3>
        <Form.Select aria-label="Default select example" onChange={handleCategoryChange}>
          <option key="Select">Select Recipe Category</option>
          <option value="Breakfast" key="Breakfast">Breakfast</option>
          <option value="Lunch" key="Lunch">Lunch</option>
          <option value="Dinner" key="Dinner">Dinner</option>
        </Form.Select>
      </div>
      <div style={styles.instructions}>
        <h5>Recipe Instructions:</h5>
        <InputGroup>
          <Form.Control
            as="textarea"
            aria-label="With textarea"
            placeholder="Type cooking instructions here..."
            value={instructionState}
            onChange={handleInstructionChange}
          />
        </InputGroup>
      </div>

      <div>
        <Button variant="primary" onClick={onSubmit}>Submit Recipe</Button>
      </div>

    </div>
  );
}
