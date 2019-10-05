import React, { Component } from "react";
import axios from "axios";
import { HeaderConfig } from "api/APIUtils";

export default class Transactions extends Component {
  state = {
    transactions: []
  };

  componentDidMount() {
    axios
      .get("api/transactions", HeaderConfig("token"))
      .then(res => {
        this.setState({ ...this.state, transactions: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        {this.state.transactions.map(item => (
          <p key={item._id}>{item.name}</p>
        ))}
      </div>
    );
  }
}
