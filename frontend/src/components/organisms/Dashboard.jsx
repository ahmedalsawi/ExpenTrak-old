import React, { Component } from "react";

import { CountCard, BarChartWrapper, PieChartWrapper } from "components";

export default class Dashboard extends Component {
  componentDidMount() {}
  render() {
    return (
      <div className="container">
        <div className="row">
          <CountCard count={3} title={"Accounts"} />
          <CountCard count={3} title={"Accounts"} />
        </div>
        <div className="row">
          <BarChartWrapper />
        </div>
        <div className="row">
          <PieChartWrapper />
        </div>
      </div>
    );
  }
}
