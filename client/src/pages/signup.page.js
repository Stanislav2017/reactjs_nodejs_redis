import React, { useState } from "react";

const SignupPage = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const changeHandler = (event) =>
    setForm({ ...form, [event.target.name]: event.target.value });

  const submitFormHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className="container">
      <h1>Signup Page</h1>
      <form onSubmit={submitFormHandler}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            id="email"
            type="text"
            name="email"
            className="form-control"
            value={form.email}
            onChange={changeHandler}
          />
          <div className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            className="form-control"
            value={form.password}
            onChange={changeHandler}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Confirm Password
          </label>
          <input
            id="password"
            type="password"
            name="confirmPassword"
            className="form-control"
            value={form.confirmPassword}
            onChange={changeHandler}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
