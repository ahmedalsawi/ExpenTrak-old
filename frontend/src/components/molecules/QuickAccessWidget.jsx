import React from "react";
import { Link } from "react-router-dom";

function QuickAccessWidget() {
  return (
    <div className="dropdown">
      <button
        className="btn btn-primary dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
      >
        <i className="fi-xwluxl-plus-wide"></i>
      </button>
      <div className="dropdown-menu">
        <Link className="dropdown-item" to="/transactions/new">
          Transaction
        </Link>
      </div>
    </div>
  );
}

export default QuickAccessWidget;
