import React, { useState } from 'react';
import NavBar from './navBar';
import Footer from './footer';
import Signup from './pages/signup';
import Login from './pages/login';
import Homepage from './pages/homepage';
import UserProfile from './pages/userProfile';
import IndividualRecipe from './pages/individualRecipe';
import AddRecipe from './pages/addRecipe';

export default function AppContainer() {
  const [currentPage, setCurrentPage] = useState('AddRecipe');

  const renderPage = () => {
    switch (currentPage) {
      case 'Login':
        return <Login />;
      case 'Signup':
        return <Signup />;
      case 'Homepage':
        return <Homepage />;
      case 'UserProfile':
        return <UserProfile />;
      case 'IndividualRecipe':
        return <IndividualRecipe />;
      default:
        return <AddRecipe />;
    }
  };

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div>
      <NavBar currentPage={currentPage} handlePageChange={handlePageChange} />
      {renderPage()}
      <footer>
        <Footer />
      </footer>
    </div>
  );
}