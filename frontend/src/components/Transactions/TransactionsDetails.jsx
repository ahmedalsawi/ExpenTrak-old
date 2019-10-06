import React, { Component } from "react";

import apiObject from "api/index";

class TransactionsDetails extends Component {
  state = {};
  componentDidMount() {
    apiObject.transactionAPI
      .getOneRes(this.props.match.params.Id)
      .then(data => {
        this.setState(data);
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return <div>{this.state.name}</div>;
  }
}

export default TransactionsDetails;
