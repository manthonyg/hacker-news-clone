import React from "react";
import styled, { keyframes, css } from "styled-components";

const loadingAnimation = keyframes`
100% {
    transform: translateX(100%);
}
`;
const PostCard = styled.div`
  display: flex;
  align-content: center;
  width: 100%;
  min-height: 100px;
  height: 100%;
  background-color: ${(props) => {
    if (props.theme.theme === "light") return "#FFFFFF";
    return "#282828";
  }};
  border-bottom: ${(props) => {
    if (props.theme.theme === "light") return "1px solid #c3c3c3";
    return "1px solid #404040";
  }};
`;

const withEmoji = css`
  content: "";
  position: absolute;
  border-radius: 100%;
  left: -50px;

  width: 40px;
  height: 40px;
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
  top: 40px;
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
    top: 60px;
  }
`;

const Loading = styled.div`
  position: relative;
  width: 100%;
`;

const SkeletonInner = styled.div`
  height: 75px;
  margin-top: 20px;
`;

function PostSkeleton({ numberOfSkeletons, noEmoji }) {
  return (
    <>
      {[...Array(numberOfSkeletons)].map((skeleton, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <PostCard>
          <Skeleton key={i}>
            <Loading>
              <SkeletonContent noEmoji={noEmoji} />
              <SkeletonContent />
              <SkeletonInner />
            </Loading>
          </Skeleton>
        </PostCard>
      ))}
    </>
  );
}

export default PostSkeleton;
