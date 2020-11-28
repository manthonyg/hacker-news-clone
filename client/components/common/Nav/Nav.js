import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Heading from "../Heading/Heading";

const NavItem = styled.li`
  display: inline-block;
  padding: 0px 10px;
`;

const NavContainer = styled.div`
  postion: fixed;
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: ${(props) => {
    if (props.theme.theme === "light") return "#f1f1f1";
    return "#181818";
  }};
  margin: 0;
  padding: 0;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  font-weight: 800;
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
      <NavItem>
        <Heading underlined p>
          HNC
        </Heading>
      </NavItem>
      <NavItem>
        <StyledLink to="/">
          <Heading h5>top</Heading>
        </StyledLink>
      </NavItem>
      <NavItem>
        <StyledLink to="/best">
          <Heading h5>best</Heading>
        </StyledLink>
      </NavItem>
      <NavItem>
        <StyledLink to="/new">
          <Heading h5>new</Heading>
        </StyledLink>
      </NavItem>
    </NavContainer>
  );
}

export default Nav;
