import React, { useEffect, useState } from "react";

import { SelectMultiple, Select } from "components";

import ETAPIs from "services/ETAPIs";

function TransactionsForm(props) {
  const [form, setForm] = useState({
    name: "",
    amount: 0,
    date: "",
    labels: [],
    account: "",
    notes: ""
  });
  const [labels, setLables] = useState([]);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ETAPIs.endpoints.labels.getAll();
        setLables(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ETAPIs.endpoints.accounts.getAll();
        setAccounts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (props.transaction) {
      setForm(preState => {
        return { ...preState, ...props.transaction };
      });
    }
  }, [props.transaction]);

  const onChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    // TODO validation

    if (form._id) {
      const updateTransaction = resource => {
        ETAPIs.endpoints.transactions
          .update(resource._id, resource)
          .then(res => {
            props.history.push("/transactions");
          })
          .catch(err => {
            console.log(err);
          });
      };

      updateTransaction(form);
    } else {
      const addTransaction = resource => {
        ETAPIs.endpoints.transactions
          .create(resource)
          .then(res => {
            props.history.push("/transactions");
          })
          .catch(err => {
            console.log(err);
          });
      };

      addTransaction(form);
    }
  };

  return (
    <div>
      <form className="form-group" onSubmit={onSubmit}>
        <input
          type="text"
          name="name"
          onChange={onChange}
          value={form.name}
          className="form-control"
          placeholder="Item or Payee"
        ></input>

        <input
          type="number"
          name="amount"
          onChange={onChange}
          value={form.amount}
          className="form-control"
          placeholder="Amount"
        ></input>

        <input
          type="date"
          name="date"
          onChange={onChange}
          value={form.date}
          className="form-control"
        ></input>

        <input
          type="text"
          name="notes"
          onChange={onChange}
          value={form.notes}
          className="form-control"
          placeholder="Notes"
        ></input>

        <Select
          className="form-control"
          name="account"
          onChange={onChange}
          value={form.account}
          options={accounts.map(item => {
            return {
              name: item.name,
              value: item._id
            };
          })}
        ></Select>

        <SelectMultiple
          className="form-control"
          name="labels"
          onChange={onChange}
          value={form.labels}
          options={labels.map(item => {
            return {
              name: item.name,
              value: item._id
            };
          })}
        ></SelectMultiple>

        <button onSubmit={onSubmit}>Save</button>
      </form>
    </div>
  );
}

export default TransactionsForm;
