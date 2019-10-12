import React, { Component } from "react";

import { CountCard } from "components";

export default class Dashboard extends Component {
  componentDidMount() {}
  render() {
    return (
      <div className="container">
        <div className="row">
          <CountCard count={3} title={"Accounts"} />
          <CountCard count={3} title={"Accounts"} />
        </div>
      </div>
    );
  }
}
