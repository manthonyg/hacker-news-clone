import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavList = styled.ul`
  list-style: none;
  text-align: center;
  float: left;
`;

const NavItem = styled.li`
  display: inline-block;
  padding: 1em;
`;

const NavContainer = styled.div`
  postion: fixed;
  height: 8vh;
  width: 100%;
  background-color: #eee;
  margin: 0;
  padding: 0;
`;

const NavButton = styled.button`
  border: 2px solid #ccc;
  width: 50px;
  height: 50px;
  float: right;
`;
function Nav() {
  return (
    <NavContainer>
      <NavButton />
      <NavList>
        <NavItem>
          <Link to="/">Top</Link>
        </NavItem>
        <NavItem>
          <Link to="/new">New</Link>
        </NavItem>
      </NavList>
    </NavContainer>
  );
}

export default Nav;
