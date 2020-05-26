import React from 'react';
import styled, { keyframes, css } from 'styled-components';

const loadingAnimation = keyframes`
100% {
    transform: translateX(100%);
}
`;

const withEmoji = css`
  content: '';
  position: absolute;
  border-radius: 100%;
  top: 0px;
  left: -25px;
  width: 20px;
  height: 20px;
  background-color: ${props => {
    if (props.theme.theme === 'light') return '#eeeeee';
    return '#212121';
  }};
`;

const Skeleton = styled.div`
  display: flex;
  padding-left: 100px;

  border-radius: 0.25rem;
  width: 50vw;
  margin: 9px 0px;
`;

const SkeletonContent = styled.span`
  height: 25px;
  position: absolute;
  top: 10px;
  left: 0px;
  width: 100%;
  background-color: ${props => {
    if (props.theme.theme === 'light') return '#eeeeee';
    return '#212121';
  }};
  &::after {
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
  &:nth-child(1):before {
    ${props => (props.noEmoji ? '' : withEmoji)}
  }
  &:nth-child(2) {
    height: 10px;
    top: 40px;
  }
`;

const Loading = styled.div`
  position: relative;
  width: 100%;
`;

const SkeletonInner = styled.div`
  height: 70px;
`;

function PostSkeleton({ numberOfSkeletons, noEmoji }) {
  return [...Array(numberOfSkeletons)].map((skeleton, i) => {
    return (
      // eslint-disable-next-line react/no-array-index-key
      <Skeleton key={i}>
        <Loading>
          <SkeletonContent noEmoji={noEmoji} />
          <SkeletonContent />
          <SkeletonInner />
        </Loading>
      </Skeleton>
    );
  });
}

export default PostSkeleton;
