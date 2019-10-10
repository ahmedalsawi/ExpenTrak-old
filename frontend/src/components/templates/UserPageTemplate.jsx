import React from "react";

function UserPageTemplate(props) {
  return (
    <div className="container-fluid">
      <div id="header-wrapper">{props.header}</div>
      <div className="row">
        <div className="col-12 col-md-3 col-xl-2" id="sidebar-wrapper">
          {props.sidebar}
        </div>
        <div className="col-12 col-md-9 col-xl-8" id="main-wrapper">
          {props.children}
        </div>
      </div>
      <div id="footer-wrapper"></div>
    </div>
  );
}

export default UserPageTemplate;
