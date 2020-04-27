// eslint-disable-next-line import/no-unresolved
import React from 'react';
import styled, { css } from 'styled-components';
import Loader from './Loader';

const roundedButtonCss = css`
  width: 100px;
  height: 100px;
  border-radius: 20%;
  border: 1px solid black;
  font-family: 'Press Start 2P', cursive;
`;

const disabledButtonCss = css`
  background-color: #a1a1a1;
  font-color: #c2c3c4;
`;

const inverseButtonCss = css`
  background-color: #fff;
  color: #a1cdf1;
`;

const StyledButton = styled.button`
  display: inline-block;
  height: 38px;
  padding: 0 30px;
  color: ${props => {
    if (props.theme.light) return '#483a58';
    return '#fff';
  }};
  text-align: center;
  font-size: 11px;
  font-weight: 600;
  line-height: 38px;
  letter-spacing: 0.1rem;
  text-transform: uppercase;
  text-decoration: none;
  white-space: nowrap;
  background-color: ${props => {
    if (props.theme.light) return '#483a58';
    if (props.theme.dark) return '#fff';
    return 'transparent';
  }};
  border-radius: 4px;
  border: 1px solid #bbb;
  cursor: pointer;
  box-sizing: border-box;

  ${props => {
    if (props.inverse) return inverseButtonCss;
    if (props.rounded) return roundedButtonCss;
    if (props.disabled) return disabledButtonCss;
  }}
`;

const Button = ({
  secondary,
  big,
  inverse,
  rounded,
  loading,
  children,
  label,
  disabled,
  ...props
}) => {
  return (
    <StyledButton
      secondary={secondary}
      label={label}
      rounded={rounded}
      big={big}
      inverse={inverse}
      disabled={disabled}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {loading ? <Loader /> : label}
    </StyledButton>
  );
};

export default Button;
