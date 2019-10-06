import React, { Component } from "react";

import { Switch, Route, withRouter, Link } from "react-router-dom";

import apiObject from "api/index";

import TransactionsList from "components/Transactions/TransactionsList";
import TransactionsForm from "components/Transactions/TransactionsForm";
import TransactionsDetails from "components/Transactions/TransactionsDetails";

class Transactions extends Component {
  state = {
    transactions: [],
    _isMounted: false
  };

  componentDidMount() {
    this._isMounted = true;

    apiObject.transactionAPI
      .getAllRes()
      .then(
        data =>
          this._isMounted &&
          this.setState({ ...this.state, transactions: data })
      )
      .catch(err => {
        console.log(err);
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  addTransaction = resource => {
    apiObject.transactionAPI
      .postOneRes(resource)
      .then(data => {
        this._isMounted &&
          this.setState({
            ...this.state,
            transactions: [data, ...this.state.transactions]
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <Link to={`${this.props.match.url}/new`}>New</Link>
        <Link to={`${this.props.match.url}`}>List</Link>
        <Switch>
          <Route
            path={`${this.props.match.url}`}
            exact
            component={() => (
              <TransactionsList transactions={this.state.transactions} />
            )}
          />

          <Route
            path={`${this.props.match.url}/new`}
            exact
            component={() => (
              <TransactionsForm onSubmit={this.addTransaction} />
            )}
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

export default withRouter(Transactions);
