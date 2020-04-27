import React from 'react';
import styled, { css } from 'styled-components';

const animatedCss = css`
  opacity: 1;
  transform: translateY(0);
  transition: all 250ms;
`;

const primaryCss = css`
  background-color: #ccc;
  color: #fff;
`;

const StyledCard = styled.div`
  width: ${props => (props.big ? '450px' : '100vw')};
  padding: 15px;
  text-align: center;
  opacity: 0;
  overflow: hidden;
  margin: ${props => (props.noMargin ? 0 : '5px')};
  border-radius: 5px;
  ${props => props.animated && animatedCss}
  ${props => props.primary && primaryCss}
`;

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animated: false
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
        {...props}
      />
    );
  }
}

export default Card;
