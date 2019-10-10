import React from "react";

import { NavLink } from "react-router-dom";

export default function SideNav(props) {
  const links = props.links.map((link, index) => (
    <NavLink
      key={index}
      to={link.to}
      className="list-group-item"
      activeClassName="active"
    >
      {link.title}
    </NavLink>
  ));
  return (
    <div>
      <nav className="list-group">{links}</nav>
    </div>
  );
}
