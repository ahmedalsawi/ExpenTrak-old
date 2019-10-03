import React, { Component } from "react";

import Dashboard from "components/DashboardPage";
import LandingPage from "components/LandingPage";

import { connect } from "react-redux";

class Home extends Component {
  render() {
    const isAuthenticated = this.props.isAuthenticated;

    return isAuthenticated ? <Dashboard /> : <LandingPage />;
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated
});

export default connect(
  mapStateToProps,
  {}
)(Home);
