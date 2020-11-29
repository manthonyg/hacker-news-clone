import React from "react";
import styled from "styled-components";

const StyledCard = styled.div`
  width: 100%;
  background-color: ${(props) => {
    if (props.theme.theme === "dark") return "#212121";
    return "#ffffff";
  }};
  color: ${(props) => {
    if (props.theme.theme === "dark") return "#eeeeee";
    return "#121212";
  }};
  margin: ${(props) => (props.noMargin ? 0 : "5px")};
`;

function Card(props) {
  const { noMargin, children } = props;

  return <StyledCard noMargin={noMargin}>{children}</StyledCard>;
}

export default Card;
