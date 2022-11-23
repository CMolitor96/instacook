import React from 'react';
import authService from "../utils/auth"
import { Link, useLocation } from "react-router-dom"

function NavBar({ currentPage, handlePageChange }) {
  const location = useLocation()
  return (
    <div className='header-div'>
      <h1 className='header-text'>instacook</h1>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <Link
            to="/login"
            className={location === '/login' ? 'nav-link active' : 'nav-link'}
          >Login</Link>
        </li>

        <li className="nav-item">
          <Link
           to="/signup"
            className={location === '/signup' ? 'nav-link active' : 'nav-link'}
          >Signup</Link>
        </li>

        <li className="nav-item">
          <Link
            to="/homepage"
            className={location === '/homepage' ? 'nav-link active' : 'nav-link'}
          >Homepage</Link>
        </li>

        <li className="nav-item">
          <Link
            to="/userprofile"
            className={location === '/userprofile' ? 'nav-link active' : 'nav-link'}
          >UserProfile</Link>
        </li>

        <li className="nav-item">
          <Link
            to="/recipe"
            className={location === '/recipe' ? 'nav-link active' : 'nav-link'}
          >IndividualRecipe</Link>
        </li>

        <li className="nav-item">
          <Link
            to="/addrecipe"
            className={location === '/addrecipe' ? 'nav-link active' : 'nav-link'}
          >AddRecipe</Link>
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
