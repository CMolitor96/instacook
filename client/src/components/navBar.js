import React from 'react';
import instacook from '../components/Images/instacook-logo.png'
import authService from "../utils/auth"
import { Link, useLocation } from "react-router-dom"

const styles = {
  logo: {
    width: '15%',
    display: 'flex',
    margin: '1%',
    borderRadius: '10px'
  },
  header: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    borderWidth: '1px',
    borderColor: '#dee2e6',
    borderStyle: 'solid'
  },
  navTabs: {
    paddingBottom: '1%',
    borderStyle: 'none'
  }
}

function NavBar({ currentPage, handlePageChange }) {
  const location = useLocation()
  return (
    <div style={styles.header}>
      <img style={styles.logo} src={instacook} alt='instacook logo'/>
      <ul style={styles.navTabs} className="nav nav-tabs">
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
