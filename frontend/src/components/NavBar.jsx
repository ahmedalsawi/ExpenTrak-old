import React, { Component } from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";

import { connect } from "react-redux";

import { logout } from "state-store/actions/authActions";
import QuickAccessWidget from "./QuickAccessWidget";
import ProfileWidget from "./ProfileWidget";

class NavBar extends Component {
  render() {
    return (
      <Wrapper className="navbar">
        <Link className="navbar-brand" to="/">
          ExpenTrak
        </Link>
        <QuickAccessWidget />
        <ProfileWidget
          logout={this.props.logout}
          email={this.props.auth.user.email}
        />
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
