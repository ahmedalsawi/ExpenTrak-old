import React, { Component } from "react";

import { Switch, Route, Redirect } from "react-router-dom";

import NavBar from "components/organisms/NavBar";
import SideBar from "components/molecules/SideNav";

import Dashboard from "components/organisms/Dashboard";
import Transactions from "components/organisms/Transactions";

import { Labels } from "components";

import { UserPageTemplate } from "components";

class UserHome extends Component {
  render() {
    return (
      <UserPageTemplate
        header={<NavBar />}
        sidebar={
          <SideBar
            links={[
              { to: "/dashboard", title: "Dashboard" },
              { to: "/transactions", title: "Transactions" },
              { to: "/labels", title: "Labels" }
            ]}
          />
        }
      >
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
      </UserPageTemplate>
    );
  }
}

export default UserHome;
