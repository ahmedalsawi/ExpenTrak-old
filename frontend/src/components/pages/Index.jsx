import React, { Component } from "react";

import { connect } from "react-redux";

import { GuestHome, UserHome } from "components";

class Index extends Component {
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
)(Index);
