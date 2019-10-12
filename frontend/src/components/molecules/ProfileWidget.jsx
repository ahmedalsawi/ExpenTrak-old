import React from "react";
// import { Link } from "react-router-dom";

function ProfileWidget(props) {
  return (
    <div className="dropdown">
      <button
        className="btn btn-primary p-0 dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
      >
        User
      </button>
      <div className="dropdown-menu dropdown-menu-right">{props.children}</div>
    </div>
  );
}

export default ProfileWidget;
