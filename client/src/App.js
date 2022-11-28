import React from "react";
import { useState } from "react";
import NavBar from "./components/navBar";
import Footer from "./components/footer";
import Signup from "./components/pages/signup";
import Login from "./components/pages/login";
import Homepage from "./components/pages/homepage";
import Filter from "./components/pages/filter";
import UserProfile from "./components/pages/userProfile";
import IndividualRecipe from "./components/pages/individualRecipe";
import AddRecipe from "./components/pages/addRecipe";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
  } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';


const httpLink = createHttpLink({
    uri: '/graphql',
});
  
// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('id_token');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
        },
    };
});

const client = new ApolloClient({
    // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

const styles = {
  headerFooter: {
    backgroundColor: '#fffbf3'
  },
  background: {
    backgroundColor: '#688774'
  }
}

function App(){
    const [currentPage, setCurrentPage] = useState("Homepage");

    const handlePageChange = (page) => setCurrentPage(page);
    return(
    <ApolloProvider client={client}>
       <Router>
      <div>
        <div style={styles.headerFooter}>
          <NavBar currentPage={currentPage} handlePageChange={handlePageChange} />
        </div>
        <div style={styles.background}>
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/homepage" element={<Homepage />} />
            <Route exact path="/homepage/:filter" element={<Filter />} />
            <Route exact path="/userprofile" element={<UserProfile />} />
            <Route exact path="/recipe/:recipeId" element={<IndividualRecipe />} />
            <Route exact path="/addrecipe" element={<AddRecipe />} />
            <Route path="*" element={<Login />} />
          </Routes>
        </div>
        <footer style={styles.headerFooter}>
          <Footer />
        </footer>
      </div>
    </Router>
    </ApolloProvider>)

    };

export default App;
