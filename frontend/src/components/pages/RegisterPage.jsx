import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { register } from "state-store/actions/authActions";

class RegisterPage extends Component {
  state = {
    email: "",
    password: ""
  };

  onSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    const newUser = {
      password,
      email
    };
    console.log(newUser);
    this.props.register(newUser);
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });
  render() {
    const { email, password } = this.state;
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
          <button type="submit">Regiser</button>
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
