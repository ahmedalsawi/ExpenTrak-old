import React from "react";
// import { Link } from "react-router-dom";

function ProfileWidget(props) {
  return (
    <div className="dropdown">
      <button
        className="btn btn-primary dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
      >
        <i className="fi-cnsuxl-user-circle-solid"></i>
      </button>
      <div className="dropdown-menu dropdown-menu-right">
        {/* <Link className="dropdown-item" to="/profile">
          Profile
        </Link> */}
        <p className="dropdown-item disabled">Logged in as {props.email}</p>
        <button className="dropdown-item" onClick={() => props.logout()}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default ProfileWidget;
