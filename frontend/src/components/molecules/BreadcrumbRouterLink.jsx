import React from "react";
import { withRouter, Link } from "react-router-dom";

function BreadcrumbRouterLink(props) {
  const segs = props.location.pathname.split("/");
  const path = segs.map((item, index) => {
    const to = segs.slice(0, index + 1).join("/");
    return (
      <li key={index} className="breadcrumb-item">
        <Link to={to}>{item}</Link>
      </li>
    );
  });
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">{path}</ol>
      </nav>
    </div>
  );
}
export default withRouter(BreadcrumbRouterLink);
