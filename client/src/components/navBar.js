import React from 'react';
import authService from "../utils/auth"

function NavBar({ currentPage, handlePageChange }) {
  return (
    <div className='header-div'>
      <h1 className='header-text'>instacook</h1>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a
            href="#login"
            onClick={() => handlePageChange('Login')}
            className={currentPage === 'Login' ? 'nav-link active' : 'nav-link'}
          >Login</a>
        </li>

        <li className="nav-item">
          <a
            href="#signup"
            onClick={() => handlePageChange('Signup')}
            className={currentPage === 'Signup' ? 'nav-link active' : 'nav-link'}
          >Signup</a>
        </li>

        <li className="nav-item">
          <a
            href="#homepage"
            onClick={() => handlePageChange('Homepage')}
            className={currentPage === 'Homepage' ? 'nav-link active' : 'nav-link'}
          >Homepage</a>
        </li>

        <li className="nav-item">
          <a
            href="#userProfile"
            onClick={() => handlePageChange('UserProfile')}
            className={currentPage === 'UserProfile' ? 'nav-link active' : 'nav-link'}
          >UserProfile</a>
        </li>

        <li className="nav-item">
          <a
            href="#individualRecipe"
            onClick={() => handlePageChange('IndividualRecipe')}
            className={currentPage === 'IndividualRecipe' ? 'nav-link active' : 'nav-link'}
          >IndividualRecipe</a>
        </li>

        <li className="nav-item">
          <a
            href="#addRecipe"
            onClick={() => handlePageChange('AddRecipe')}
            className={currentPage === 'AddRecipe' ? 'nav-link active' : 'nav-link'}
          >AddRecipe</a>
        </li>
        <li className="nav-item">
          <button
            onClick={() => authService.logout() }
          >Logout</button>
        </li>
      </ul>
      
    </div>
  );
}

export default NavBar;
