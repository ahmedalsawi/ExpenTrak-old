import React, { useEffect, useState } from "react";

import { TableList } from "components";

import ETAPIs from "services/ETAPIs";

function Labels(props) {
  const [labels, setLabels] = useState([]);
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
        const { data } = await ETAPIs.endpoints.labels.getAll();
        if (!didCancel) setLabels(data);
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
      await ETAPIs.endpoints.labels.delete(item._id);
      const newLabels = labels.filter(l => l._id !== item._id);
      setLabels(newLabels);
    } catch (err) {
      console.log(err);
    }
  };

  const ListView =
    labels.length === 0 ? (
      <p>No labels</p>
    ) : (
      <React.Fragment>
        <TableList
          data={labels}
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

    if (form._id) {
      const updateItem = resource => {
        ETAPIs.endpoints.labels
          .update(resource._id, resource)
          .then(res => {
            const newLables = labels.map(l => {
              return l._id === form._id ? res.data : l;
            });
            setLabels(newLables);
          })
          .catch(err => {
            console.log(err);
          });
      };

      updateItem(form);
    } else {
      const addItem = resource => {
        ETAPIs.endpoints.labels
          .create(resource)
          .then(res => {
            setLabels([...labels, res.data]);
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

export default Labels;
