import React, { Component } from "react";

class TransactionsForm extends Component {
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

export default TransactionsForm;
