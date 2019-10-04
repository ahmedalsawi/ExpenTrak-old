import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

export default function SideBar() {
  return (
    <Wrapper className="sticky-top">
      <div className="list-group">
        <NavLink
          to="/dashboard"
          className="list-group-item"
          activeClassName="active"
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/transactions"
          className="list-group-item"
          activeClassName="active"
        >
          Transactions
        </NavLink>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div``;
