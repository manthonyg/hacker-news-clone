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
  height: 10vh;
  width: 100%;
  background-color: ${props => {
    if (props.theme.theme === 'light') return '#f1f1f1';
    return '#212121';
  }};
  margin: 0;
  padding: 0;
`;

const NavButton = styled.button`
  border: 2px solid #ccc;
  background-color: ${props => {
    if (props.theme.theme === 'light') return '#f1f1f1';
    return '#121212';
  }};
  color: ${props => {
    if (props.theme.theme === 'light') return '#121212';
    return '#f1f1f1';
  }};
  width: 50px;
  height: 50px;
  float: right;
`;
function Nav({ onClick, theme }) {
  return (
    <NavContainer>
      <NavButton onClick={onClick}>
        {theme.theme === 'light' ? 'dark mode' : 'light mode'}
      </NavButton>
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
