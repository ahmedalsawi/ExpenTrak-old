import React, { Component } from "react";

import { Switch, Route, Redirect } from "react-router-dom";

import NavBar from "components/organisms/NavBar";
import SideBar from "components/molecules/SideNav";

import Dashboard from "components/organisms/Dashboard";
import Transactions from "components/organisms/Transactions";
import Breadcrumb from "components/molecules/Breadcrumb";

import { Labels } from "components";

class UserHome extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-md-3 col-xl-2" id="sidebar">
              <SideBar
                links={[
                  { to: "/dashboard", title: "Dashboard" },
                  { to: "/transactions", title: "Transactions" },
                  { to: "/labels", title: "Labels" }
                ]}
              />
            </div>
            <div className="col-12 col-md-9 col-xl-8" id="main-panel">
              <Breadcrumb />
              <Switch>
                <Route
                  path="/"
                  component={() => <Redirect to="/dashboard" />}
                  exact
                />
                <Route path="/dashboard" component={Dashboard} exact />
                <Route path="/transactions" component={Transactions} />
                <Route path="/labels" component={Labels} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserHome;
