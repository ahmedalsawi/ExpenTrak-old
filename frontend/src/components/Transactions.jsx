import React, { Component } from "react";

import { Switch, Route } from "react-router-dom";

import TransactionsList from "components/TransactionsList";
import TransactionsForm from "components/TransactionsForm";
import TransactionsDetails from "components/TransactionsDetails";

class Transactions extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route
            path={`${this.props.match.url}`}
            exact
            component={TransactionsList}
          />

          <Route
            path={`${this.props.match.url}/new`}
            exact
            component={TransactionsForm}
          />

          <Route
            path={`${this.props.match.url}/:Id`}
            exact
            component={TransactionsDetails}
          />
        </Switch>
      </div>
    );
  }
}

export default Transactions;
