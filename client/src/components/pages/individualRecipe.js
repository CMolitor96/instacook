import React, { useState } from "react";
import { individualRecipe } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

const styles = {
  title: {
    margin: "2vh 8vw 4vh 5vw",
    textAlign: "center",
  },
  image: {
    padding: "5px",
    margin: "3vh 3vw 3vh 3vw",
  
    
  },
  imageStyle: {
    objectFit: "cover",
    maxWidth: "40vw",
    maxHeight: "40vh",
  },

  time: {
    textAlign: "center",
    height: "20vh",
    border: "2px solid",
    borderRadius: "5px",
    padding: "5px",
    margin: "3vh 3vw 3vh 3vw",
    width: "32vw",
    
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
    height: "40vh",
    width: "50vw",
    border: "2px solid",
    borderRadius: "5px",
    padding: "5px",
    margin: "3vh 3vw"
    
  },
  comment: {},
};
function IndividualRecipe() {
  const { recipeId } = useParams();
  const { loading, data } = useQuery(individualRecipe, {
    variables: { id: recipeId },
    
  });

  if (loading) {
    return <div>Loading...</div>;
  }
  console.log(data)

  return (
    <div className="wrapper">
      <h1 className="title" style={styles.title}>
        {data.recipe.recipeName}
      </h1>

      <div className="row" id="individual">
        <div className="col-6 col-sm-4 image" style={styles.image}>
         <img style={styles.imageStyle} src={data.recipe.recipeImages}></img>
        </div>
        <div className="col-6 col-sm-4 ingredients" style={styles.ingredients}>
          <p>{data.recipe.recipeIngredients}</p>
        </div>

        <div className="w-100"></div>
        <div className="col-6 col-sm-4 time" style={styles.time}>
          <h1>Created By: {data.recipe.recipeAuthor}</h1>
          <h1>Category: {data.recipe.recipeCategory}</h1>
        </div>
      </div>
      <div className="row instructions" style={styles.instructions}>
        <p>{data.recipe.recipeInstructions}</p>
      </div>

      <form role="form">
        <div class="form-group">
          <textarea class="form-control" rows="3" required></textarea>
        </div>
        <button type="submit" class="btn btn-success">
          Submit
        </button>
      </form>
      {/* <div className="comment" style={styles.comment}><p>comments: {data.recipe.comments[0].commentText}</p></div> */}
    </div>
  );
}

export default IndividualRecipe;
