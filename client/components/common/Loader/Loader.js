import React from "react";
import styled, { keyframes } from "styled-components";

const Bounce = keyframes`
  0%, 80%, 100% { 
    transform: scale(0);
  } 40% { 
    transform: scale(1.0);
  }
`;

const StyledDotsLoader = styled.div`
  display: inline-block;
`;

const Dot = styled.span`
  display: inline-block;
  width: 1em;
  background-color: ${(props) => {
    if (props.theme.theme === "light") return "#121212";
    return "#212121";
  }};
  height: 1em;
  border-radius: 100%;
  animation: ${Bounce} 1s infinite ease-in-out both;
  &:first-child {
    animation-delay: -0.32s;
  }
  &:nth-child(2) {
    animation-delay: -0.16s;
  }
`;

const Loader = () => {
  return (
    <StyledDotsLoader>
      <Dot />
      <Dot />
      <Dot />
    </StyledDotsLoader>
  );
};

export default Loader;
