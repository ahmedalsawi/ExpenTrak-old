import React, { useEffect, useState } from "react";
import apiObject from "api/index";

import { TableList } from "components";

function Labels(props) {
  const [labels, setLabels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [isError, setIsError] = useState(false);

  const [form, setForm] = useState({ name: "" });

  useEffect(() => {
    let didCancel = false;

    async function fetchData() {
      setIsLoading(true);
      setIsError(false);

      try {
        const data = await apiObject.labelsAPI.getAllRes();
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
      await apiObject.labelsAPI.deleteOneRes(item._id);
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
    console.log(form);

    if (form._id) {
      const updateItem = resource => {
        apiObject.labelsAPI
          .putOneRes(resource)
          .then(data => {
            const newLables = labels.map(l => {
              return l._id === form._id ? data : l;
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
        apiObject.labelsAPI
          .postOneRes(resource)
          .then(data => {
            setLabels([...labels, data]);
          })
          .catch(err => {
            console.log(err);
          });
      };

      addItem(form);
    }
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
