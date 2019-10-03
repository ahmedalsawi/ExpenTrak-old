import React, { Component } from "react";

import Dashboard from "components/pages/DashboardPage";
import LandingPage from "components/pages/LandingPage";

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
