import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { register } from "state-store/actions/authActions";

import { Redirect } from "react-router-dom";

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
    // Validation TODO
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
      <Wrapper>
        <form onSubmit={this.onSubmit}>
          <input
            type="username"
            name="username"
            onChange={this.onChange}
            value={username}
          ></input>

          <input
            type="email"
            name="email"
            onChange={this.onChange}
            value={email}
          ></input>

          <input
            type="password"
            name="password"
            onChange={this.onChange}
            value={password}
          ></input>

          <input
            type="password2"
            name="password2"
            onChange={this.onChange}
            value={password2}
          ></input>

          <button type="submit">Register</button>
        </form>
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
