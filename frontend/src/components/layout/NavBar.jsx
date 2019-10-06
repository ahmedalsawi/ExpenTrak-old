import React, { Component } from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";

import { connect } from "react-redux";

import { logout } from "state-store/actions/authActions";

class NavBar extends Component {
  render() {
    return (
      <Wrapper className="navbar">
        <Link className="navbar-brand" to="/">
          ExpenTrak
        </Link>

        <button className="btn btn-primary" onClick={() => this.props.logout()}>
          Logout
        </button>
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

const Wrapper = styled.header``;
