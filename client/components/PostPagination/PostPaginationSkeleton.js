import React from 'react';
import styled from 'styled-components';

const SkeletonContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: no-wrap;
`;

const SkeletonButton = styled.button`
  display: flex;
  height: 38px;
  padding: 2px 20px;
  background-color: ${props => {
    if (props.theme.theme === 'light') return '#eeeeee';
    return '#212121';
  }};
  text-align: center;
  font-size: 11px;
  margin: 2px;
  font-weight: 600;
  line-height: 38px;
  letter-spacing: 0.1rem;
  text-transform: uppercase;
  text-decoration: none;
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
