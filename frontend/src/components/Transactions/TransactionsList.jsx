import React, { Component } from "react";

import { Link } from "react-router-dom";

class TransactionsList extends Component {
  render() {
    return (
      <div>
        {this.props.transactions.map(item => (
          <p key={item._id}>
            <Link to={`transactions/${item._id}`}>{item.name}</Link>
          </p>
        ))}
      </div>
    );
  }
}

export default TransactionsList;
