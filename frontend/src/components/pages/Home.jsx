import React, { Component } from "react";

import { connect } from "react-redux";

import GuestHome from "components/pages/GuestHome";
import UserHome from "./UserHome";

class Home extends Component {
  render() {
    const isAuthenticated = this.props.isAuthenticated;

    return isAuthenticated ? <UserHome /> : <GuestHome />;
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated
});

export default connect(
  mapStateToProps,
  {}
)(Home);
