import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Skeleton = styled.div`
  max-width: 90vw;
  padding: 15px;
  height: 250px;
  margin: 5px;
`;
const Loading = styled.div`
  position: relative;
  width: 100%;
  background-color: ${(props) => {
    if (props.theme.theme === "light") return "#e3e3e3";
    return "#212121";
  }};
`;

const SkeletonInner = styled.div`
  height: 250px;
`;

function UserInfoSkeleton({ numberOfSkeletons }) {
  return [...Array(numberOfSkeletons)].map((skeleton, i) => {
    return (
      <Skeleton key={i + numberOfSkeletons}>
        <Loading>
          <SkeletonInner />
        </Loading>
      </Skeleton>
    );
  });
}

UserInfoSkeleton.propTypes = {
  numberOfSkeletons: PropTypes.number,
  noEmoji: PropTypes.bool,
};
export default UserInfoSkeleton;
