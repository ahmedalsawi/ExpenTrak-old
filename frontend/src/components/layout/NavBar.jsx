import React, { Component } from "react";
import styled from "styled-components";

import { connect } from "react-redux";

import { logout } from "state-store/actions/authActions";

import { NavLink } from "react-router-dom";

class NavBar extends Component {
  render() {
    return (
      <Wrapper className="navbar navbar-expand-lg navbar-light bg-light">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo01"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <a className="navbar-brand" href="/">
            ExpenTrak
          </a>
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
          </ul>
          <button onClick={() => this.props.logout()}>Logout</button>
        </div>
      </Wrapper>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.authReducer
});

export default connect(
  mapStateToProps,
  { logout }
)(NavBar);

const Wrapper = styled.nav``;
