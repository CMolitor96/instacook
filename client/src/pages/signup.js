import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Signup = () => {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [addUser, {error, data}] = useMutation(ADD_USER);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserData({ ...userData, [name]: value });
      };
    

      const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(userData);
    
        try {
          const { data } = await addUser({
            variables: { ...userData },
          });
    
          Auth.login(data.addUser.token);
        } catch (e) {
          console.error(e);
        }
      };
    return (

        <div class="form-box registration-form p-md-5 p-3">
        <div class="form-title">
          <h2 class="fw-bold mb-3">Create Your Account</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control form-control-sm floatingInput"
              placeholder="username"
              value={userData.username}
              onChange={handleInputChange}
            />
            <label for="floatingInput">User Name</label>
          </div>
    
          <div class="form-floating mb-3">
            <input
              type="email"
              class="form-control form-control-sm floatingInput"
              placeholder="Email"
              id="signUpEmail"
              value={userData.email}
              onChange={handleInputChange}
            />
            <label for="floatingInput">Email</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="password"
              class="form-control form-control-sm floatingPassword"
              placeholder="Password"
              id="signUpPassword"
              value={userData.password}
              onChange={handleInputChange}
            />
            <label for="floatingPassword">Password</label>
          </div>
          <div class="mt-3">
            <button class="btn primaryBg text-white" id="signupbtn2" type='submit'>
              Sign up
            </button>
          </div>
        </form>
        <div class="mt-3">
          <span class="account">Already have an account?</span>
          <button class="p-0 border-0 bg-transparent primaryColor login-show">
            Login
          </button>
          {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
        </div>
      </div> 
    );
}
export default Signup;