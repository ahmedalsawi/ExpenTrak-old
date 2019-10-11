import React from "react";

function Select({ onChange, options, ...props }) {
  return (
    <React.Fragment>
      <select onChange={onChange} {...props}>
        <option key="id" value="">
          ----
        </option>
        {options.map(option => {
          return (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          );
        })}
      </select>
    </React.Fragment>
  );
}

export default Select;
