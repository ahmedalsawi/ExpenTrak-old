import React, { Component } from "react";
import styled from "styled-components";

import { Switch, Route, Redirect } from "react-router-dom";

import { connect } from "react-redux";

import NavBar from "components/layout/NavBar";
import SideBar from "components/layout/SideNav";

import Dashboard from "components/Dashboard";
import Transactions from "components/Transactions";

import GuestView from "components/pages/GuestHome";

class Home extends Component {
  render() {
    const isAuthenticated = this.props.isAuthenticated;

    if (!isAuthenticated) return <GuestView />;

    return (
      <Wrapper className="container">
        <div id="sidebar">
          <SideBar />
        </div>
        <div id="main-panel">
          <NavBar />
          <Redirect to="/dashboard" />
          <Switch>
            <Route path="/dashboard" component={() => <Dashboard />} exact />
            <Route
              path="/transactions"
              component={() => <Transactions />}
              exact
            />
          </Switch>
        </div>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated
});

export default connect(
  mapStateToProps,
  {}
)(Home);

const Wrapper = styled.div``;
