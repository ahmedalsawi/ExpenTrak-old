import React, { Component } from "react";

import { Link } from "react-router-dom";

class LoginForm extends Component {
  state = {
    email: "",
    password: ""
  };

  onSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;

    this.props.login(email, password);
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { email, password } = this.state;
    return (
      <div className="card">
        <div className="card-header">
          <p>Login</p>
        </div>

        <div className="card-body">
          <form onSubmit={this.onSubmit} className="form-group">
            <input
              type="email"
              name="email"
              onChange={this.onChange}
              value={email}
              className="form-control"
              placeholder="Email"
            ></input>
            <input
              type="password"
              name="password"
              onChange={this.onChange}
              value={password}
              className="form-control"
              placeholder="Password"
            ></input>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
        <div className="card-footer">
          <div className="d-flex justify-content-center links">
            Don't have an account?<Link to="/register">Register</Link>
          </div>
          {/* <div className="d-flex justify-content-center">
            <Link to="#">Forgot your password?</Link>
          </div> */}
        </div>
      </div>
    );
  }
}

export default LoginForm;
