import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import Container from '../common/Container/Container';

const loadingAnimation = keyframes`
100% {
    transform: translateX(100%);
}
`;

const withEmoji = css`
  content: '';
  position: absolute;
  border-radius: 100%;
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
  padding-left: 80px;
  width: 50vw;
`;

const SkeletonContent = styled.span`
  height: 13px;
  position: absolute;
  top: 8px;
  width: 100%;
  background-color: ${props => {
    if (props.theme.theme === 'light') return '#eeeeee';
    return '#212121';
  }};
  &::after {
    content: '';
    width: 50%;
    filter: blur(10px);
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
    height: 8px;
    top: 28px;
  }
`;

const Loading = styled.div`
  position: relative;
  width: 100%;
`;

const SkeletonInner = styled.div`
  height: 40px;
`;

function PostSkeleton({ numberOfSkeletons, noEmoji }) {
  return (
    <Container>
      {[...Array(numberOfSkeletons)].map((skeleton, i) => (
        // eslint-disable-next-line react/no-array-index-key

        <Skeleton key={i}>
          <Loading>
            <SkeletonContent noEmoji={noEmoji} />
            <SkeletonContent />
            <SkeletonInner />
          </Loading>
        </Skeleton>
      ))}
    </Container>
  );
}

export default PostSkeleton;
