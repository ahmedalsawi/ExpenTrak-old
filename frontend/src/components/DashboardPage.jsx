import React, { Component } from "react";
import DashboardPageNavBar from "components/DashboardPageNavBar";
export default class DashboardPage extends Component {
  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        <DashboardPageNavBar />
      </div>
    );
  }
}
