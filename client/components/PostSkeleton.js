import React from 'react';
import styled, { keyframes } from 'styled-components';

const loadingAnimation = keyframes`
100% {
    transform: translateX(100%);
}
`;

const Skeleton = styled.div`
  background: white;
  border-radius: 0.25rem;
  max-width: 600px;
  margin: 9px;
`;
const Loading = styled.div`
  position: relative;
  width: 100%;
  background-color: ${props => {
    if (props.theme.theme === 'light') return '#e2e2e2';
    return '#212121';
  }};
  &::after {
    display: block;
    content: '';
    top: 0;
    width: 50%;
    position: absolute;
    height: 100%;
    transform: translateX(-100%);
    background: linear-gradient(
      90deg,
      transparent,
      ${props => {
        if (props.theme.theme === 'light') return 'rgba(255, 255, 255, 0.9)';
        return 'rgba(255, 255, 255, 0.02)';
      }},
      transparent
    );
    animation: ${loadingAnimation} 1s infinite;
  }
`;

const SkeletonInner = styled.div`
  height: 60px;
`;

function PostSkeleton({ numberOfSkeletons }) {
  return [...Array(numberOfSkeletons)].map((skeleton, i) => {
    return (
      // eslint-disable-next-line react/no-array-index-key
      <Skeleton key={i}>
        <Loading>
          <SkeletonInner />
        </Loading>
      </Skeleton>
    );
  });
}

export default PostSkeleton;
