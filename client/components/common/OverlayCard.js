import React from 'react';
import styled, { keyframes } from 'styled-components';

const StyledImage = styled.img`
  max-width: 100%;
`;

const StyledCard = styled.div`
  position: relative;
  background: #333;
  width: 400px;
  height: 75vh;
  border-radius: 6px;
  padding: 2rem;
  color: #fff;
  box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.2), 0 0 1rem rgba(0, 0, 0, 0.2);
`;
const StyledImageContainer = styled.div`
  margin: -2rem -2rem 1rem -2rem;
`;
const CardSVGLine = styled.div`
  opacity: 0;
  animation: ${LineFadeIn} 0.8s 0.8s forwards ease-in;
`;

const CardImage = styled.img`
  opacity: 0;
  animation: ${ImageFadeIn} 0.8s 1.4s forwards;
  height: 350px;
  width: 100%;
`;
const CardTitle = styled.div`
  color: white;
  margin-top: 0;
  font-weight: 800;
  letter-spacing: 0.01em;
`;

const CardContent = styled.div`
  margin-top: -1rem;
  opacity: 0;
  animation: ${ContentFadeIn} 0.8s 1.6s forwards;
`;
const CardSVG = styled.div`
  position: absolute;
  left: 0;
  top: 115px;
`;

const LineFadeIn = keyframes`
   {
    0% {
      opacity: 0;
      d: path(
        'M 0 300 Q 0 300 0 300 Q 0 300 0 300 C 0 300 0 300 0 300 Q 0 300 0 300 '
      );
      stroke: #fff;
    }

    50% {
      opacity: 1;
      d: path(
        'M 0 300 Q 50 300 100 300 Q 250 300 350 300 C 350 300 500 300 650 300 Q 750 300 800 300'
      );
      stroke: #888bff;
    }

    100% {
      opacity: 1;
      d: path(
        'M -2 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 802 400'
      );
      stroke: #545581;
    }
  }
`;

const ContentFadeIn = keyframes`
  0% {
    transform: translateY(-1rem);
    opacity: 0;
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const ImageFadeIn = keyframes`
  0% {
    transform: translate(-0.5rem, -0.5rem) scale(1.05);
    opacity: 0;
    filter: blur(2px);
  }

  50% {
    opacity: 1;
    filter: blur(2px);
  }

  100% {
    transform: translateY(0) scale(1);
    opacity: 1;
    filter: blur(0);
  }
`;

function OverlayCard({ image, children }) {
  return (
    <StyledCard>
      <StyledImageContainer>
        <CardImage src={image} />
      </StyledImageContainer>

      <CardSVG viewBox="0 0 800 500">
        <path
          d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400 L 800 500 L 0 500"
          stroke="transparent"
          fill="#333"
        />
      </CardSVG>
    </StyledCard>
  );
}
export default OverlayCard;
