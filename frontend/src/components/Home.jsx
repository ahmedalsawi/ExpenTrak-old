import React, { Component } from "react";

import Dashboard from "components/DashboardPage";
import LandingPage from "components/LandingPage";

import { connect } from "react-redux";
import { loadUser } from "state-store/actions/authActions";

class Home extends Component {
  componentDidMount() {
    this.props.loadUser();
  }
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
  { loadUser }
)(Home);
