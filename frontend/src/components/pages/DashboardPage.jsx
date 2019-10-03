import React, { Component } from "react";

import MenuBar from "components/layout/MenuBar";

export default class DashboardPage extends Component {
  render() {
    return (
      <div>
        <div>
          <MenuBar />
        </div>
        <div>{/* Main window content */}</div>
      </div>
    );
  }
}
