import React, { Component } from "react";

import { connect } from "react-redux";
import { register } from "state-store/actions/authActions";

import { Redirect } from "react-router-dom";

import { RegisterForm, CenterBoxTemplate } from "components";

class RegisterPage extends Component {
  render() {
    if (this.props.isAuthenticated) return <Redirect to="/" />;

    return (
      <CenterBoxTemplate>
        <RegisterForm register={this.props.register}></RegisterForm>
      </CenterBoxTemplate>
    );
  }
}
const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated
});
export default connect(
  mapStateToProps,
  { register }
)(RegisterPage);
