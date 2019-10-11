import React, { useEffect, useState } from "react";
import apiObject from "api/index";

import { TableList } from "components";

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
        const data = await apiObject.accountsAPI.getAllRes();
        if (!didCancel) setAccounts(data);
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
      await apiObject.accountsAPI.deleteOneRes(item._id);
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
        apiObject.accountsAPI
          .putOneRes(resource)
          .then(data => {
            const newLables = accounts.map(l => {
              return l._id === form._id ? data : l;
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
        apiObject.accountsAPI
          .postOneRes(resource)
          .then(data => {
            setAccounts([...accounts, data]);
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
