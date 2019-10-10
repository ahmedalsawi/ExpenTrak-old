import React from "react";

function SelectMultiple({ onChange, options, ...props }) {
  const onChangeSelectMultiple = e => {
    const opts = e.target.options;

    const selected = [];
    for (var opt, j = 0; (opt = opts[j]); j++) {
      if (opt.selected === true) {
        selected.push(opt.value);
      }
    }

    const e1 = {
      target: {
        name: props.name,
        value: selected
      }
    };
    onChange(e1);
  };

  return (
    <React.Fragment>
      <select multiple onChange={onChangeSelectMultiple} {...props}>
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

export default SelectMultiple;
