import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { login } from "state-store/actions/authActions";

import { Redirect } from "react-router-dom";

class LoginPage extends Component {
  state = {
    email: "",
    password: ""
  };

  onSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;

    const user = {
      password,
      email
    };

    this.props.login(user);
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { email, password } = this.state;

    if (this.props.isAuthenticated) return <Redirect to="/" />;

    return (
      <Wrapper>
        <form onSubmit={this.onSubmit}>
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
          <button type="submit">Login</button>
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
  { login }
)(LoginPage);

const Wrapper = styled.div``;
