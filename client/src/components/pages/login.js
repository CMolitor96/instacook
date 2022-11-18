import React, { useState } from "react";

const Login = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });

  // const [login, {error}]= useMutation(loginMutation)
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };
    return (
      <div class="container">
        <div class="row justify-content-center align-items-center inner-row">
          <div class="col-lg-5 col-md-7">
            <div class="form-box login-form p-md-5 p-3">
              <div class="form-title">
                <h2 class="fw-bold mb-3 login">Login</h2>
              </div>
              <form action="">
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
                  <button class="btn primaryBg text-white" id="loginbtn">
                    Login
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
            <div class="form-box registration-form p-md-5 p-3">
              <div class="form-title">
                <h2 class="fw-bold mb-3">Create Your Account</h2>
              </div>
              <form action="">
                <div class="form-floating mb-3">
                  <input
                    type="text"
                    class="form-control form-control-sm floatingInput"
                    placeholder="First Name"
                    id="firstName"
                  />
                  <label for="floatingInput">First Name</label>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="text"
                    class="form-control form-control-sm floatingInput"
                    placeholder="Last Name"
                    id="lastName"
                  />
                  <label for="floatingInput">Last Name</label>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="email"
                    class="form-control form-control-sm floatingInput"
                    placeholder="Email"
                    id="signUpEmail"
                  />
                  <label for="floatingInput">Email</label>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="password"
                    class="form-control form-control-sm floatingPassword"
                    placeholder="Password"
                    id="signUpPassword"
                  />
                  <label for="floatingPassword">Password</label>
                </div>
                <div class="mt-3">
                  <button class="btn primaryBg text-white" id="signupbtn2">
                    Sign up
                  </button>
                </div>
              </form>
              <div class="mt-3">
                <span class="account">Already have an account?</span>
                <button class="p-0 border-0 bg-transparent primaryColor login-show">
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default Login
