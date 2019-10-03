import React, { Component } from "react";
import styled from "styled-components";

export default class LoginPage extends Component {
  state = {
    email: "",
    password: ""
  };

  onSubmit = e => {
    e.preventDefault();
  };

  render() {
    return (
      <Wrapper>
        <form>
          <lable>Email</lable>
          <input type="email" name="email"></input>
          <lable>Password</lable>
          <input type="password" name="password"></input>
        </form>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div``;
