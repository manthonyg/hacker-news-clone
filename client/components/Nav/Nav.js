import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const NavTitle = styled.li`
  display: inline-block;
  font-weight: 900;
  padding: 0px 10px;
  color: ${(props) => {
    if (props.theme.theme === "light") return "#121212";
    return "#f1f1f1";
  }};
`;

const NavItem = styled.li`
  display: inline-block;
  padding: 0px 10px;
`;

const NavContainer = styled.div`
  postion: fixed;
  height: 100%;
  width: 100%;
  background-color: ${(props) => {
    if (props.theme.theme === "light") return "#f1f1f1";
    return "#212121";
  }};
  margin: 0;
  padding: 0;
`;

const NavButton = styled.button`
  font-size: 1.3rem;
  padding: 0px;
  border: none;
  background: none;
  float: right;
`;

function Nav({ onClick, theme }) {
  return (
    <NavContainer>
      <NavButton onClick={onClick}>
        {theme.theme === "light" ? "🌃" : "🌆"}
      </NavButton>
      <NavItem>HNC</NavItem>
      <NavItem>
        <Link to="/">Top</Link>
      </NavItem>
      <NavItem>
        <Link to="/best">Best</Link>
      </NavItem>
      <NavItem>
        <Link to="/new">New</Link>
      </NavItem>
    </NavContainer>
  );
}

export default Nav;
