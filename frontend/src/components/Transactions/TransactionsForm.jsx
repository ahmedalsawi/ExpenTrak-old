import React, { useEffect, useState } from "react";

import apiObject from "api/index";

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
        const labels = await apiObject.labelsAPI.getAllRes();
        setLables(labels);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accounts = await apiObject.accountsAPI.getAllRes();
        setAccounts(accounts);
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
        apiObject.transactionAPI
          .putOneRes(resource)
          .then(data => {
            props.history.push("/transactions");
          })
          .catch(err => {
            console.log(err);
          });
      };

      updateTransaction(form);
    } else {
      const addTransaction = resource => {
        apiObject.transactionAPI
          .postOneRes(resource)
          .then(data => {
            props.history.push("/transactions");
          })
          .catch(err => {
            console.log(err);
          });
      };

      addTransaction(form);
    }
  };

  const onChangeSelectMultiple = e => {
    const opts = e.target.options;

    const selectedLabels = [];
    for (var opt, j = 0; (opt = opts[j]); j++) {
      if (opt.selected === true) {
        selectedLabels.push(opt.value);
      }
    }

    setForm({ ...form, [e.target.name]: selectedLabels });
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

        <select
          className="form-control"
          name="account"
          onChange={onChange}
          value={form.account}
        >
          <option key="id" value="">
            ----
          </option>
          {accounts.map(item => {
            return (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            );
          })}
        </select>

        <select
          multiple
          className="form-control"
          name="labels"
          onChange={onChangeSelectMultiple}
          value={form.labels}
        >
          {labels.map(item => {
            return (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            );
          })}
        </select>

        <button onSubmit={onSubmit}>Save</button>
      </form>
    </div>
  );
}

export default TransactionsForm;
