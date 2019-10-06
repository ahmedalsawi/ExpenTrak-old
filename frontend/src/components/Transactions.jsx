import React, { Component } from "react";

import { Switch, Route, withRouter, Link } from "react-router-dom";

import apiObject from "api/index";

class TransactionForm extends Component {
  state = {
    name: ""
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
  };
  render() {
    const { name } = this.state;
    return (
      <div>
        <form onSubmit={this.onSubmit} className="form-group">
          <input
            type="text"
            name="name"
            onChange={this.onChange}
            value={name}
            className="form-control"
            placeholder="Name"
          ></input>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </form>
      </div>
    );
  }
}

class TransactionList extends Component {
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

class TransactionDetails extends Component {
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
              <TransactionList transactions={this.state.transactions} />
            )}
          />

          <Route
            path={`${this.props.match.url}/new`}
            exact
            component={() => <TransactionForm onSubmit={this.addTransaction} />}
          />

          <Route
            path={`${this.props.match.url}/:Id`}
            exact
            component={TransactionDetails}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(Transactions);
