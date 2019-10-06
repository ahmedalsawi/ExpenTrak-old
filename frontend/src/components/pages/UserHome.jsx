import React, { Component } from "react";

import { Switch, Route, Redirect } from "react-router-dom";

import NavBar from "components/layout/NavBar";
import SideBar from "components/layout/SideNav";

import Dashboard from "components/Dashboard";
import Transactions from "components/Transactions/Transactions";

class UserHome extends Component {
  render() {
    return (
      <div>
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
                <Route path="/dashboard" component={Dashboard} exact />
                <Route path="/transactions" component={Transactions} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserHome;
