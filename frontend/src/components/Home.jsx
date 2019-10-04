import React, { Component } from "react";

import Dashboard from "components/Dashboard";
import GuestView from "components/GuestView";

import { connect } from "react-redux";

class Home extends Component {
  render() {
    const isAuthenticated = this.props.isAuthenticated;

    return <div>{isAuthenticated ? <Dashboard /> : <GuestView />}</div>;
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated
});

export default connect(
  mapStateToProps,
  {}
)(Home);
