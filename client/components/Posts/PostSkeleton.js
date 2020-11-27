import React from "react";
import styled, { keyframes, css } from "styled-components";

const loadingAnimation = keyframes`
100% {
    transform: translateX(100%);
}
`;

const withEmoji = css`
  content: "";
  position: absolute;
  border-radius: 100%;
  left: -25px;
  width: 20px;
  height: 20px;
  background-color: ${(props) => {
    if (props.theme.theme === "light") return "#eeeeee";
    return "#212121";
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
  background-color: ${(props) => {
    if (props.theme.theme === "light") return "#eeeeee";
    return "#212121";
  }};

  &:nth-child(1):before {
    ${(props) => (props.noEmoji ? "" : withEmoji)}
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
  height: 75px;
`;

function PostSkeleton({ numberOfSkeletons, noEmoji }) {
  return (
    <>
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
    </>
  );
}

export default PostSkeleton;
