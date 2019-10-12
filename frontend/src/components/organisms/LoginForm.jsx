import React, { Component } from "react";

import { Link } from "react-router-dom";

import { AlertFlash } from "components";

class LoginForm extends Component {
  state = {
    email: "",
    password: "",
    errMsg: ""
  };

  onSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;

    // validation
    if (email === "" || password === "") {
      this.setState({ ...this.state, errMsg: "All Fields required" });
      return;
    }
    this.props.login(email, password);
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onClick = e => {
    this.setState({ ...this.state, errMsg: "" });
  };

  render() {
    const { email, password, errMsg } = this.state;
    return (
      <div className="login-wrapper d-flex flex-column">
        <div className="header-logo"></div>
        <div className="header-title">
          <h1 className="text-center">Login</h1>
        </div>

        <AlertFlash message={errMsg} onClick={this.onClick}></AlertFlash>

        <div className="form-wrapper card">
          <div className="card-body">
            <form onSubmit={this.onSubmit} className="form-group">
              <label className="font-weight-bold">Email</label>
              <input
                type="email"
                name="email"
                onChange={this.onChange}
                value={email}
                className="form-control"
                autoComplete="off"
              ></input>

              <label className="d-flex justify-content-between mt-2">
                <div className="font-weight-bold">Password</div>
                <Link to="/forgetpassword">Forget password?</Link>
              </label>
              <input
                type="password"
                name="password"
                onChange={this.onChange}
                value={password}
                className="form-control"
                autoComplete="off"
              ></input>

              <button
                type="submit"
                className="form-control btn btn-primary mt-3"
              >
                LOGIN
              </button>
            </form>
          </div>
        </div>

        <div className="form-footer">
          <Link to="/register">Don't have an account?</Link>
        </div>
      </div>
    );
  }
}

export default LoginForm;
