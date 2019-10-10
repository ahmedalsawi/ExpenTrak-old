import React, { Component } from "react";

import { connect } from "react-redux";
import { login } from "state-store/actions/authActions";

import { Redirect } from "react-router-dom";

import { LoginForm } from "components";
import { CenterBoxTemplate } from "components";
class LoginPage extends Component {
  render() {
    if (this.props.isAuthenticated) return <Redirect to="/" />;

    return (
      <CenterBoxTemplate>
        <LoginForm login={this.props.login}></LoginForm>
      </CenterBoxTemplate>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated
});
export default connect(
  mapStateToProps,
  { login }
)(LoginPage);
