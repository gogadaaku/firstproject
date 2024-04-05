import React, { useState } from "react";
import Header from "../../components/Header";
import axios from "axios";
function Login() {
  const [login, setLogin] = useState({
    userName: "",
    password: "",
    confirmPassword: "",
  });
  const [loginError, setLoginError] = useState({
    userName: "",
    password: "",
    confirmPassword: "",
  });
  function onLoginClick() {
    console.log(loginError);
    let errors = false;
    let error = {
      userName: "",
      password: "",
      confirmPassword: "",
    };
    if (login.userName == "" || login.userName.trim().length == 0) {
      errors = true;
      error = { ...error, userName: "Enter UserName" };
    }
    if (login.password == "" || login.password.trim().length == 0) {
      errors = true;
      error = { ...error, password: "Enter password" };
    }
    if (
      login.confirmPassword == "" ||
      login.confirmPassword.trim().length == 0
    ) {
      errors = true;
      error = { ...error, confirmPassword: "Enter Confirm Password" };
    }
    if (login.confirmPassword != login.password) {
      errors = true;
      error = { ...error, confirmPassword: "Enter Same Passwords" };
    }
    if (errors) {
      setLoginError(error);
      return;
    }
  }
  const changeHandler = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
    console.log(login);
  };
  return (
    <div>
      <Header />
      <div>
        <div class="card text-center mx-auto col-6 mt-4">
          <div class="card-header">
            <h2>Login</h2>
          </div>
          <div class="card-body">
            <div className="form-group row">
              <label className="col-lg-4">User Name</label>
              <div className="col-lg-8">
                <input
                  name="userName"
                  onChange={changeHandler}
                  type="text"
                  placeholder="Enter Name"
                  className="form-control"
                />
                <p className="text-danger">{loginError.userName}</p>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-lg-4">User Password</label>
              <div className="col-lg-8">
                <input
                  name="password"
                  onChange={changeHandler}
                  type="password"
                  placeholder="Enter Password"
                  className="form-control"
                />
                <p className="text-danger">{loginError.password}</p>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-lg-4">Confirm Password</label>
              <div className="col-lg-8">
                <input
                  name="confirmPassword"
                  onChange={changeHandler}
                  type="password"
                  placeholder="Confirm Password"
                  className="form-control"
                />
                <p className="text-danger">{loginError.confirmPassword}</p>
              </div>
            </div>
          </div>
          <div class="card-footer text-muted">
            <button
              onClick={() => {
                onLoginClick();
              }}
              className="btn btn-warning"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
