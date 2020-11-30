/* eslint-disable react/no-danger */
import React, { useState } from "react";
import moment from "moment";
import Heading from "../common/Heading/Heading";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { truncateString } from "../../utils/truncate";
import { fadeInLeft, fadeInRight } from "../../utils/keyframes/fadeAnimations";
import Button from "../common/Button/Button";
import PropTypes from "prop-types";

const CommentCard = styled.div`
  opacity: 0;
  width: 100%;
  min-height: 100px;
  animation: ${fadeInLeft};
  animation-duration: 0.3s;
  animation-delay: ${(props) => props.animationOrder}ms;
  animation-timing-function: cubic-bezier(0.39, 0.575, 0.565, 1);
  animation-fill-mode: both;
  background-color: ${(props) => {
    if (props.theme.theme === "light") return "#FFFFFF";
    return "#282828";
  }};
  border-bottom: ${(props) => {
    if (props.theme.theme === "light") return "1px solid #c3c3c3";
    return "1px solid #404040";
  }};
  &:nth-child(even) {
    animation: ${fadeInRight};
    animation-duration: 0.3s;
    animation-delay: ${(props) => props.animationOrder}ms;
    animation-timing-function: cubic-bezier(0.39, 0.575, 0.565, 1);
    animation-fill-mode: both;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: underline;
  color: ${(props) => {
    if (props.theme.theme === "light") return "#404040";
    return "#bb86fc";
  }};
`;

const CommentCardHeader = styled.p`
  margin-left: 5px;
  margin-top: 10px;
`;

const CommentCardContent = styled.p`
  display: block;
  flex-wrap: wrap;
  overflow-wrap: break-word;
  max-width: 800px;
  margin: 10px 10%;
  position: relative;
  height: 100%;
  &: after {
  content: "";
  text-align: right;
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: ${(props) => {
    if (!!props.truncatedStyle) {
      if (props.theme.theme === "light") {
        return "linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1) 100%)";
      }
      return "linear-gradient(to bottom, rgba(40, 40, 40, 0), rgba(40, 40, 40, 1) 100%)";
    }
  }}
`;

function Comment({ comment }) {
  const { by, id, text, time } = comment;

  const MAX_STRING_LENGTH = 500;
  const [isTruncated, setIsTruncated] = useState(
    text?.length > MAX_STRING_LENGTH
  );

  const handleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  return (
    <CommentCard>
      <CommentCardHeader>
        <Heading h5>
          <StyledLink to={`/user?id=${by}`}>{by}</StyledLink> at{" "}
          {moment.unix(time).format("YYYY-MM-DD")}:
        </Heading>
      </CommentCardHeader>{" "}
      <CommentCardContent truncatedStyle={isTruncated}>
        {" "}
        <p
          dangerouslySetInnerHTML={{
            __html:
              text?.length > MAX_STRING_LENGTH
                ? truncateString(text, MAX_STRING_LENGTH, isTruncated)
                : text,
          }}
        />
      </CommentCardContent>
      {text?.length > MAX_STRING_LENGTH && (
        <Button onClick={handleTruncate}>
          {isTruncated ? "read more" : "less"}
        </Button>
      )}
    </CommentCard>
  );
}

Comment.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    by: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired,
  }),
};

export default Comment;
