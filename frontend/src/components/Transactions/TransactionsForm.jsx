import React, { Component } from "react";

import apiObject from "api/index";

class TransactionsForm extends Component {
  state = {
    name: ""
  };

  componentDidMount() {
    console.log(this.props);
    if (this.props.transaction) {
      this.setState({ ...this.state, ...this.props.transaction });
    }
  }
  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();

    if (this.state._id) {
      console.log(this.state);

      const updateTransaction = resource => {
        apiObject.transactionAPI
          .putOneRes(resource)
          .then(data => {
            this.props.history.push("/transactions");
          })
          .catch(err => {
            console.log(err);
          });
      };

      updateTransaction(this.state);
    } else {
      const addTransaction = resource => {
        apiObject.transactionAPI
          .postOneRes(resource)
          .then(data => {
            this.props.history.push("/transactions");
          })
          .catch(err => {
            console.log(err);
          });
      };

      addTransaction(this.state);
    }
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

export default TransactionsForm;
