import React, { Component } from "react";

import { Link } from "react-router-dom";

import styled from "styled-components";
export default class GuestHome extends Component {
  render() {
    return (
      <Wrapper>
        <header className="navbar bg-light">
          <Link className="navbar-brand" to="/">
            ExpenTrak
          </Link>
          <div className="d-flex flex-row justify-content-between">
            <Link to="/login" className="nav-item nav-link">
              Login
            </Link>
            <Link to="/register" className="nav-item nav-link">
              Register
            </Link>
          </div>
        </header>
        <body className="d-flex flex-column">
          <div id="page-content">
            <div className="jumbotron">
              <h1 className="display-4">Hello, world!</h1>
              <p className="lead"></p>
            </div>
          </div>
        </body>
        <footer id="sticky-footer" class="py-4 bg-dark text-white-50">
          <div class="container text-center">
            <small> &copy; EnpenTrak</small>
          </div>
        </footer>
      </Wrapper>
    );
  }
}
const Wrapper = styled.div``;
