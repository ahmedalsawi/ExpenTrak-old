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
      <Wrapper>
        <NavBar />
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-md-3 col-xl-2" id="sidebar">
              <SideBar />
            </div>
            <div className="col-12 col-md-9 col-xl-8" id="main-panel">
              <Switch>
                <Route
                  path="/"
                  component={() => <Redirect to="/dashboard" />}
                  exact
                />
                <Route
                  path="/dashboard"
                  component={() => <Dashboard />}
                  exact
                />
                <Route
                  path="/transactions"
                  component={() => <Transactions />}
                />
              </Switch>
            </div>
          </div>
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
