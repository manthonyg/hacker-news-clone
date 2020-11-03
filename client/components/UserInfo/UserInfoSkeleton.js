import React from "react";
import styled, { keyframes } from "styled-components";

const loadingAnimation = keyframes`
100% {
    transform: translateX(100%);
}
`;

const Skeleton = styled.div`
  border-radius: 0.25rem;
  max-width: 90vw;
  padding: 15px;
  height: 250px;
  border-radius: 5px;
  margin: 5px;
`;
const Loading = styled.div`
  position: relative;
  width: 100%;
  background-color: ${(props) => {
    if (props.theme.theme === "light") return "#e2e2e2";
    return "#212121";
  }};
`;

const SkeletonInner = styled.div`
  height: 250px;
`;

function UserInfoSkeleton({ numberOfSkeletons }) {
  return [...Array(numberOfSkeletons)].map((skeleon, i) => {
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
export default UserInfoSkeleton;
