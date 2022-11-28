import React from 'react';
import { useState } from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import '../../styles/test.css'




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
  const inputArr = [
    {
      id: 1,
      size: "sm",
      value: "",
      className: "mb-3"
    }
  ];

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

  const handleChange = e => {
    e.preventDefault();

    const index = e.target.id;
    setArr(s => {
      const newArr = s.slice();
      newArr[index].value = e.target.value;

      return newArr;
    });
  };
  return (
    <div style={styles.AddRecipeContainer}>
      <div>
        <button onClick={addInput}>+</button>
        {arr.map((item, i) => {
          return (
            <div>
              <InputGroup onChange={handleChange} size={item.size} className={item.className} value={item.value} id={i} style={styles.ingredientInput}>
                <Form.Control
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  placeholder="Type ingredient name here..."
                />
              </InputGroup>

              <InputGroup onChange={handleChange} size={item.size} className={item.className} value={item.value} id={i} style={styles.quantInput}>
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

      <h1 style={styles.addRecipeTitle}>Add A New Recipe</h1>
      <div style={styles.titleContainer}>
        <h3>Recipe Title:</h3>
        <InputGroup size="sm" className="mb-3" style={styles.titleInput}>
          <Form.Control
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            placeholder="Type recipe title here..."
          />
        </InputGroup>
      </div>

      <div>
        <div style={styles.recipeIngredients}>
          <div style={styles.recipeItemInput}>
            <h5>Ingredients:</h5>
            <InputGroup size="sm" className="mb-3" style={styles.ingredientInput}>
              <Form.Control
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                placeholder="Type ingredient name here..."
              />
            </InputGroup>
          </div>
          <div style={styles.recipeItemInput}>
            <h5>Quantity:</h5>
            <InputGroup size="sm" className="mb-3" style={styles.quantInput}>
              <Form.Control
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                placeholder="Type ingredient quantity here..."
              />
            </InputGroup>
          </div>
        </div>

        <Button variant="primary">+ Add Another Ingredient</Button>{' '}

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
        <Form.Select aria-label="Default select example">
          <option>Select Recipe Category</option>
          <option value="1">Breakfast</option>
          <option value="2">Lunch</option>
          <option value="3">Dinner</option>
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
        <Button variant="primary">Submit Recipe</Button>{' '}
      </div>

    </div>
  );
}
