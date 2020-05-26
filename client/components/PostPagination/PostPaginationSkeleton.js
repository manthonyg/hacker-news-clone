import React from 'react';
import styled, { keyframes, css } from 'styled-components';

const loadingAnimation = keyframes`
100% {
    transform: translateX(100%);
}
`;

const SkeletonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const SkeletonButton = styled.button`
  display: inline-block;
  height: 38px;
  width: 9%;
  padding: 2px 30px;
  background-color: ${props => {
    if (props.theme.theme === 'light') return '#eeeeee';
    return '#212121';
  }};
  text-align: center;
  font-size: 11px;
  font-weight: 600;
  line-height: 38px;
  letter-spacing: 0.1rem;
  text-transform: uppercase;
  text-decoration: none;
  white-space: nowrap;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  box-sizing: border-box;
`;

function PostPaginationSkeleton({ numberOfSkeletons }) {
  return [...Array(numberOfSkeletons)].map((skeleton, i) => {
    return (
      // eslint-disable-next-line react/no-array-index-key
      <>
        <SkeletonContainer>
          <SkeletonButton />
          <SkeletonButton />
          <SkeletonButton />
          <SkeletonButton />
          <SkeletonButton />
          <SkeletonButton />
          <SkeletonButton />
        </SkeletonContainer>
      </>
    );
  });
}

export default PostPaginationSkeleton;
