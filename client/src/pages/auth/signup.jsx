import React, { useState } from "react";
import { connect } from "react-redux";
import { signupService } from "../../services/auth.service";

const SignupPage = ({ signupHandler }) => {
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
    <div className="content">
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
        <button
          type="submit"
          className="btn btn-primary"
          onClick={signupHandler.bind(null, form)}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    signupHandler: (data) => dispatch(signupService(data)),
  };
}

export default connect(null, mapDispatchToProps)(SignupPage);
