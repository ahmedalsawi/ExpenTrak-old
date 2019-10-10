import React, { Component } from "react";
import styled from "styled-components";

import { connect } from "react-redux";
import { register } from "state-store/actions/authActions";

import { Redirect, Link } from "react-router-dom";

class RegisterPage extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    password2: ""
  };

  onSubmit = e => {
    e.preventDefault();
    const { username, email, password, password2 } = this.state;
    // Validation
    if (password !== password2) {
    }
    // Register the user
    const newUser = {
      username,
      email,
      password
    };
    this.props.register(newUser);
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { username, email, password, password2 } = this.state;

    if (this.props.isAuthenticated) return <Redirect to="/" />;

    return (
      <Wrapper className="container">
        <div className="d-flex justify-content-center">
          <div className="card">
            <div className="card-header">
              <p>Register</p>
            </div>

            <div className="card-body">
              <form onSubmit={this.onSubmit} className="form-group">
                <input
                  type="username"
                  name="username"
                  onChange={this.onChange}
                  value={username}
                  className="form-control"
                  placeholder="User Name"
                ></input>

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

                <input
                  type="password2"
                  name="password2"
                  onChange={this.onChange}
                  value={password2}
                  className="form-control"
                  placeholder="Repeat Password"
                ></input>

                <button type="submit" className="btn btn-primary">
                  Register
                </button>
              </form>
            </div>
            <div className="card-footer">
              <div className="d-flex justify-content-center links">
                Already Have account?<Link to="/login">Login</Link>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }
}
const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated
});
export default connect(
  mapStateToProps,
  { register }
)(RegisterPage);

const Wrapper = styled.div``;
