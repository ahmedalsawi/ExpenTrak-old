import React, { Component } from "react";

import { connect } from "react-redux";
import { logout } from "state-store/actions/authActions";

class DashboardPageNavBar extends Component {
  render() {
    return (
      <div>
        <button onClick={() => this.props.logout()}>Logout</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated
});

export default connect(
  mapStateToProps,
  { logout }
)(DashboardPageNavBar);
