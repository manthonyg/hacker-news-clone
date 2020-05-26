// eslint-disable-next-line import/no-unresolved
import React from 'react';
import styled, { css } from 'styled-components';
import Loader from './Loader';

const disabledButtonCss = css`
  background-color: ${props => {
    if (props.theme.theme === 'light') return '#483a58';
    return '#212121';
  }};
  font-color: #c2c3c4;
`;

const StyledButton = styled.button`
  display: inline-block;
  height: 38px;
  padding: 0 30px;
  color: ${props => {
    if (props.theme.theme === 'light') return '#c2c3c4';
    return '#03DAC6';
  }};
  text-align: center;
  font-size: 11px;
  font-weight: 600;
  line-height: 38px;
  letter-spacing: 0.1rem;
  text-transform: uppercase;
  text-decoration: none;
  white-space: nowrap;
  background-color: transparent;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  box-sizing: border-box;
  ${props => {
    if (props.disabled) return disabledButtonCss;
  }}
`;

const Button = ({ loading, children, label, disabled, ...props }) => {
  return (
    <StyledButton
      label={label}
      disabled={disabled}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {loading ? <Loader /> : label || children}
    </StyledButton>
  );
};

export default Button;
