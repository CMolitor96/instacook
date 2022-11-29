import React from 'react';
import AuthService from '../../utils/auth'

export default function IndividualRecipe() {
  console.log('loggedIn?', AuthService.loggedIn())
  return (
    <div>
      <h1>IndividualRecipe</h1>
    </div>
  );
}