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
  width: 98vw;
  padding: 10px;
`;
const Loading = styled.div`
  position: relative;
  background-color: #e2e2e2;
  &::after {
    display: block;
    content: '';
    top: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    transform: translateX(-100%);
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.5),
      transparent
    );
    animation: ${loadingAnimation} 2s infinite;
  }
`;

const SkeletonInner = styled.div`
  height: 35px;
`;

function PostSkeleton({ numberOfSkeletons }) {
  return [...Array(numberOfSkeletons)].map((item, i) => {
    return (
      <Skeleton key={Date.now() + i}>
        <Loading>
          <SkeletonInner />
        </Loading>
      </Skeleton>
    );
  });
}

export default PostSkeleton;
