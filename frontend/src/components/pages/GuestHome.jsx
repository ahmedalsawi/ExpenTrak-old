import React, { Component } from "react";

import { Link } from "react-router-dom";

import styled from "styled-components";

export default class GuestHome extends Component {
  render() {
    return (
      <Wrapper>
        <header className="navbar bg-light sticky-top">
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
        <div className="d-flex flex-column" id="page-content">
          <div id="section1">
            <div className="jumbotron m-0 rounded-0">
              <h1 className="display-4">Track your Expenses easily</h1>
              <p className="lead"></p>
            </div>
          </div>
          <div id="section2"></div>
        </div>
        <footer id="sticky-footer" className="py-4 bg-dark text-white-50">
          <div className="container text-center">
            {/* <small> &copy; EnpenTrak</small> */}
          </div>
        </footer>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div``;
