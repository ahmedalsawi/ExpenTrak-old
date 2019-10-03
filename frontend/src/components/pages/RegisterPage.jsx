import React, { Component } from "react";
import styled from "styled-components";

export default class RegisterPage extends Component {
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
        <form>Register</form>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div``;
