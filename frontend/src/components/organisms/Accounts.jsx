import React, { useEffect, useState } from "react";

import { TableList } from "components";

import ETAPIs from "services/ETAPIs";

function Accounts(props) {
  const [accounts, setAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [isError, setIsError] = useState(false);

  const formInitState = {
    name: ""
  };
  const [form, setForm] = useState(formInitState);

  useEffect(() => {
    let didCancel = false;

    async function fetchData() {
      setIsLoading(true);
      setIsError(false);

      try {
        const res = await ETAPIs.endpoints.accounts.getAll();
        if (!didCancel) setAccounts(res.data);
      } catch (err) {
        console.log(err);
        setIsError(true);
      }

      setIsLoading(false);
    }

    fetchData();

    return () => {
      didCancel = true;
    };
  }, []);

  const onEdit = async item => {
    setForm({ ...item });
  };

  const onDelete = async item => {
    try {
      await ETAPIs.endpoints.accounts.delete(item._id);
      const newLabels = accounts.filter(l => l._id !== item._id);
      setAccounts(newLabels);
    } catch (err) {
      console.log(err);
    }
  };

  const ListView =
    accounts.length === 0 ? (
      <p>No accounts</p>
    ) : (
      <React.Fragment>
        <TableList
          data={accounts}
          header={["name"]}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </React.Fragment>
    );

  const onChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    console.log(form);

    if (form._id) {
      const updateItem = resource => {
        ETAPIs.endpoints.accounts
          .update(resource._id, resource)
          .then(res => {
            const newLables = accounts.map(l => {
              return l._id === form._id ? res.data : l;
            });
            setAccounts(newLables);
          })
          .catch(err => {
            console.log(err);
          });
      };

      updateItem(form);
    } else {
      const addItem = resource => {
        ETAPIs.endpoints.accounts
          .create(resource)
          .then(res => {
            setAccounts([...accounts, res.data]);
          })
          .catch(err => {
            console.log(err);
          });
      };

      addItem(form);
    }

    setForm(formInitState);
  };

  const formView = (
    <form className="form-group" onSubmit={onSubmit}>
      <input
        type="text"
        name="name"
        onChange={onChange}
        value={form.name}
        className="form-control"
        placeholder="Name"
      ></input>
      <button type="submit" className="form-control">
        Save
      </button>
    </form>
  );

  return (
    <React.Fragment>
      {formView}
      {isError ? <h1>Error</h1> : isLoading ? <div>Loading ...</div> : ListView}
    </React.Fragment>
  );
}

export default Accounts;
