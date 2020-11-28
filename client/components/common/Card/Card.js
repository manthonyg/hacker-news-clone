import React from "react";
import styled, { css } from "styled-components";

const animatedCss = css`
  opacity: 1;
  transform: translateY(0);
  transition: all 250ms;
`;

const primaryCss = css`
  border: ${(props) => {
    if (props.theme.theme === "dark") return "1px solid #BB86FC";
    return "1px solid #121212";
  }};
  background-color: ${(props) => {
    if (props.theme.theme === "dark") return "#212121";
    return "#ffffff";
  }};
  color: ${(props) => {
    if (props.theme.theme === "dark") return "#eeeeee";
    return "#121212";
  }};
`;

const StyledCard = styled.div`
  width: ${(props) => (props.big ? "450px" : "80vw")};
  padding: 15px;
  opacity: 0;
  margin: ${(props) => (props.noMargin ? 0 : "5px")};
  border-radius: 5px;
  ${(props) => props.animated && animatedCss}
  ${(props) => props.primary && primaryCss}
`;

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animated: false,
    };
  }

  componentDidMount() {
    const { delay } = this.props;
    setTimeout(() => {
      this.setState(() => {
        return { animated: true };
      });
    }, delay);
  }

  render() {
    const {
      delay = 0,
      noAnimation,
      primary,
      noMargin,
      big,
      ...props
    } = this.props;

    const { animated } = this.state;
    return (
      <StyledCard
        animated={animated}
        delay={delay}
        primary={primary}
        noAnimation={noAnimation}
        big={big}
        noMargin={noMargin}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      />
    );
  }
}

export default Card;
