import React, { Component } from "react";

import NavBar from "components/NavBar";
import SideBar from "components/SideBar";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <div className="container">
          <div className="row">
            <div className="col-sm-3">
              <SideBar />
            </div>
            <div className="col-sm-9">
              <Switch>
                <Route
                  path="/dashboard"
                  component={() => <p>DAshboard</p>}
                  exact
                />
                <Route
                  path="/transactions"
                  component={() => <p>trans</p>}
                  exact
                />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
