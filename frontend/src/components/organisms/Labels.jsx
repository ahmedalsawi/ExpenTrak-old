import React, { useEffect, useState } from "react";

function Labels() {
  const [labels, setLabels] = useState([]);
  const [form, setForm] = useState({ name: "" });

  useEffect(() => {}, []);

  const onSubmit = e => {
    e.preventDefault();
    console.log(form);
    const newItem = { name: form.name };
    setLabels([newItem, ...labels]);
  };

  const onChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div>
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
      </div>
      <div>
        {labels.map(label => (
          <p>{label.name}</p>
        ))}
      </div>
    </div>
  );
}

export default Labels;
