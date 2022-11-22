import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";

const Login = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // const [login, {error}]= useMutation(loginMutation)

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(userData);
    try {
      const { data } = await login({
        variables: { ...userData },
      });
      Auth.login(data.login.token);
    } catch (e) {
      console.log(e);
    }
    setUserData({
      email: "",
      password: "",
    });
  };
  return (
    <div class="container">
      <div class="row justify-content-center align-items-center inner-row">
        <div class="col-lg-5 col-md-7">
          <div class="form-box login-form p-md-5 p-3">
            <div class="form-title">
              <h2 class="fw-bold mb-3 login">Login</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div class="form-floating mb-3">
                <input
                  name="email"
                  value={userData.email}
                  type="email"
                  class="form-control form-control-sm floatingInput"
                  placeholder="Email"
                  id="loginEmail"
                  onChange={handleInputChange}
                />
                <label for="loginEmail">Email</label>
              </div>
              <div class="form-floating mb-3">
                <input
                  name="password"
                  value={userData.password}
                  type="password"
                  class="form-control form-control-sm floatingPassword"
                  placeholder="Password"
                  id="loginPassword"
                  onChange={handleInputChange}
                />
                <label for="loginPassword">Password</label>
              </div>
              <div class="mt-3">
                <button
                  class="btn primaryBg text-white"
                  id="loginbtn"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
            <div class="mt-3 account">
              <span> Dont have an account?</span>
              <button
                class="p-0 border-0 bg-transparent primaryColor signup-show"
                id="signupbtn"
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
