import React, { useState } from "react";
import Header from "../../components/Header";

const Register = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    password: "",
    role: "",
  });

  const [error, setError] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = true;
    let error = {
      firstname: "",
      lastname: "",
      phone: "",
      email: "",
      password: "",
      role: "",
    };

    if (formData.firstname == "") {
      errors = true;
      error = { ...error, firstname: "Please Enter First Name" };
    }

    if (formData.lastname == "") {
      errors = true;
      error = { ...error, lastname: "Pls Enter LastName" };
    }

    if (formData.phone == "") {
      errors = true;
      error = { ...error, phone: "Pls Enter Phone Number" };
    }

    if (formData.email == "") {
      errors = true;
      error = { ...error, email: "Enter Email or invalid Email" };
    }

    if (formData.role == "") {
      errors = true;
      error = { ...error, role: "Pls select role" };
    }

    if (formData.password == "") {
      errors = true;
      error = { ...error, password: "Pls Enter Password" };
    }
    console.log(formData);

    if (errors) {
      setError(error);
    }
  };

  return (
    <>
      <Header />
      <div className="registration-form">
        <h2>Registration Form</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>First Name:</label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
            />
            <p className="text-danger">{error.firstname}</p>
          </div>
          <div>
            <label>Last Name:</label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
            />
            <p className="text-danger">{error.lastname}</p>
          </div>
          <div>
            <label>Phone:</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <p className="text-danger">{error.phone}</p>
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <p className="text-danger">{error.email}</p>
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <p className="text-danger">{error.password}</p>
          </div>
          <div>
            <label>Role:</label>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <p className="text-danger">{error.role}</p>
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </>
  );
};

export default Register;
