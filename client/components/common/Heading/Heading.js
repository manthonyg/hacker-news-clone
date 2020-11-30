/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import styled, { css } from "styled-components";

const baseStyle = css`
  margin-bottom: ${(props) => props.noMargin && "0"};
  color: ${(props) => {
    if (props.theme.theme === "light") return "#202020";
    return "03DAC6#";
  }};
  position: ${(props) => {
    if (props.isSticky) return "sticky";
    return "none";
  }};
  background-color: ${(props) => {
    if (props.isSticky && props.theme.theme === "light") return "#c3c3c3";
    else if (props.isSticky && props.theme.theme === "dark") return "#121212";
    else return "none";
  }};
  top: 0;
  z-index: 999;
  display: block;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  text-decoration: ${(props) => {
    if (props.underlined) return "underline";
    return "none";
  }}
  text-align: ${(props) => {
    if (props.center) return "center";
    if (props.right) return "right";
    return "left";
  }};

  max-width: 100%;
`;

const HeadingOne = styled.h1`
  font-size: 42px;
  font-weight: bold;
  margin-bottom: 25px;
  ${baseStyle};
  @media (max-width: 480px) {
    font-size: 40px;
  }
`;

const HeadingTwo = styled.h2`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;
  ${baseStyle};
`;

const HeadingThree = styled.h3`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 15px;
  ${baseStyle};
`;

const HeadingFour = styled.h4`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 10px;
  ${baseStyle};
`;

const HeadingFive = styled.h5`
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 5px;
  ${baseStyle};
`;

const Heading = ({
  h2,
  h3,
  h4,
  h5,
  noMargin,
  underlined,
  isSticky,
  right,
  center,
  ...props
}) => {
  if (h2)
    return (
      <HeadingTwo
        noMargin={noMargin}
        isSticky={isSticky}
        right={right}
        center={center}
        underlined={underlined}
        {...props}
      />
    );
  if (h3)
    return (
      <HeadingThree
        noMargin={noMargin}
        isSticky={isSticky}
        right={right}
        center={center}
        underlined={underlined}
        {...props}
      />
    );
  if (h4)
    return (
      <HeadingFour
        noMargin={noMargin}
        isSticky={isSticky}
        right={right}
        center={center}
        underlined={underlined}
        {...props}
      />
    );
  if (h5)
    return (
      <HeadingFive
        noMargin={noMargin}
        isSticky={isSticky}
        right={right}
        center={center}
        underlined={underlined}
        {...props}
      />
    );
  return (
    <HeadingOne
      noMargin={noMargin}
      right={right}
      center={center}
      isSticky={isSticky}
      {...props}
    />
  );
};

export default Heading;
