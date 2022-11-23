import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import { LOGIN_USER } from "../../utils/mutations";
import { redirect } from "react-router-dom";
import authService from "../../utils/auth";

const Login = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN_USER);

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
      if (data) redirect("/");
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
    <>
    <main className="flex-row justify-center mb-4">
     
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">Login</h4>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <input
                className="form-input"
                placeholder="Your email"
                name="email"
                type="email"
                value={userData.email}
                onChange={handleInputChange}
              />
              <input
                className="form-input"
                placeholder="******"
                name="password"
                type="password"
                value={userData.password}
                onChange={handleInputChange}
              />
              <button
                className="btn btn-block btn-primary"
                style={{ cursor: "pointer" }}
                type="submit"
              >
                Submit
              </button>
            </form>
            
            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    
    </main>
    </>
  );
};

export default Login;
