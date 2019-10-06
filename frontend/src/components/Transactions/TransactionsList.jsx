import React, { Component } from "react";

import { Link } from "react-router-dom";

function TransactionsItem({ item }) {
  return (
    <div>
      <Link to={`/transactions/${item._id}`}>
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">{item.name}</h5>
          <small>{item.amount}</small>
        </div>
        <p></p>
        <small></small>
      </Link>
    </div>
  );
}

class TransactionsList extends Component {
  render() {
    return (
      <div>
        <ul className="list-group list-group-flush">
          {this.props.transactions.map(item => (
            <li className="list-group-item">
              <TransactionsItem item={item} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default TransactionsList;
