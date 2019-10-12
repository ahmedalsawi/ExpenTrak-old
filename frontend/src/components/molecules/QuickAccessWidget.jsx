import React from "react";

function QuickAccessWidget(props) {
  return (
    <div className="dropdown">
      <button
        className="btn btn-primary dropdown-toggle p-0 mr-1"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
      >
        Add
      </button>
      <div className="dropdown-menu dropdown-menu-right">{props.children}</div>
    </div>
  );
}

export default QuickAccessWidget;
