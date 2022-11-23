import React, { useState } from "react";
import NavBar from "./navBar";
import Footer from "./footer";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Homepage from "./pages/homepage";
import UserProfile from "./pages/userProfile";
import IndividualRecipe from "./pages/individualRecipe";
import AddRecipe from "./pages/addRecipe";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function AppContainer() {
  const [currentPage, setCurrentPage] = useState("Homepage");

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <Router>
      <div>
        <NavBar currentPage={currentPage} handlePageChange={handlePageChange} />
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/homepage" element={<Homepage />} />
          <Route exact path="/userprofile" element={<UserProfile />} />
          <Route exact path="/recipe" element={<IndividualRecipe />} />
          <Route exact path="/addrecipe" element={<AddRecipe />} />
          <Route path="*" element={<Login />} />
        </Routes>
        <footer>
          <Footer />
        </footer>
      </div>
    </Router>
  );
}
