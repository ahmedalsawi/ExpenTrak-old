import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class LandingPageNavBar extends Component {
  render() {
    return (
      <div>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    );
  }
}