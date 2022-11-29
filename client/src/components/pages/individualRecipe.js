import React, { useState } from "react";
import { individualRecipe } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

const styles = {
  title: {
    margin: "2vh 8vw 0vh 5vw",
    textAlign: "center",
  },
  image: {
    textAlign: "center",
    height: "20vh",
    border: "2px solid",
    borderRadius: "5px",
    padding: "5px",
    margin: "3vh 3vw 3vh 3vw",
  },
  time: {
    textAlign: "center",
    height: "20vh",
    border: "2px solid",
    borderRadius: "5px",
    padding: "5px",
    margin: "3vh 3vw 3vh 3vw",
  },
  instructions: {
    margin: "3vh 3vw 3vh 3vw",
    textAlign: "center",
    height: "8vh",
    textAlign: "center",
    border: "2px solid",
    borderRadius: "5px",
    padding: "5px",
    width: "98vw",
  },
  ingredients: {
    textAlign: "center",
    height: "20vh",
    width: "60vw",
    border: "2px solid",
    borderRadius: "5px",
    padding: "5px",
  },
  comment: {},
};
function IndividualRecipe() {
  const { recipeId } = useParams();
  const { loading, data } = useQuery(individualRecipe, {
    variables: { id: recipeId },
  
  });
  // console.log(data)
  // console.log(recipeId)
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="wrapper">
      <h1 className="title" style={styles.title}>
        {data.recipe.recipeName}
      </h1>

      <div className="row">
        <div className="col-6 col-sm-4 image" style={styles.image}>
         <img src={data.recipe.recipeImages}></img>
        </div>
        <div className="col-6 col-sm-4 ingredients" style={styles.ingredients}>
          <p>{data.recipe.recipeIngredients}</p>
        </div>

        <div className="w-100"></div>
        <div className="col-6 col-sm-4 time" style={styles.time}>
          <h1>{data.recipe.recipeAuthor}</h1>
          <h1>{data.recipe.recipeCategory}</h1>
        </div>
      </div>
      <div className="row instructions" style={styles.instructions}>
        <p>{data.recipe.recipeInstructions}</p>
      </div>

      <form role="form" className="comment" style={styles.comment}>
        <div class="form-group">
          <textarea class="form-control" rows="3" required></textarea>
        </div>
        <button type="submit" class="btn btn-success">
          Submit
        </button>
      </form>
    </div>
  );
}

export default IndividualRecipe;
