import React from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { truncateString } from "../../utils/truncate";
import moment from "moment";
import { fadeInLeft, fadeInRight } from "../../utils/keyframes/fadeAnimations";

const PostCard = styled.div`
  display: flex;
  opacity: 0;
  align-content: center;
  width: 100%;
  min-height: 100px;
  height: 100%;
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

const List = styled.ol`
  list-style: none;
  counter-reset: item;
`;

const StyledLink = styled(Link)`
  text-decoration: underline;
  color: ${(props) => {
    if (props.theme.theme === "light") return "#404040";
    return "#bb86fc";
  }};
  font-weight: 800;
`;

const ListTitle = styled.span`
  @media (min-width: 1020px) {
    font-size: 1.2rem;
  }
  @media (max-width: 1020px) {
    font-size: 0.95rem;
  }
  background-color: ${(props) => {
    if (props.theme.theme === "light") return "#ffc";
    return "#212121";
  }};
  font-weight: 700;
  color: ${(props) => {
    if (props.theme.theme === "light") return "#212121";
    return "#bb86fc";
  }};
`;

const ListLinkName = styled.p`
  @media (min-width: 1020px) {
    display: inline-block;
    margin-left: 10px;
    color: #ccc;
    font-size: 0.8rem;
  }
  @media (max-width: 1020px) {
    display: none;
  }
`;
const ListItem = styled.li`
  font-size: 14px;
  padding-left: 25px;
  margin: 20px;
  position: relative;
  &: before {
    content: "${(props) => {
      if (props.score >= 1000)
        return "🔥" + " " + "+" + props.score.toString().slice(0, 1) + "k";
      if (props.score < 10) return "🧊" + " " + "+" + props.score;
      if (props.score >= 10 && props.score <= 999)
        return "😎" + " " + "+" + props.score;
    }}";
    color: ${(props) => {
      if (props.theme.theme === "light") return "#404040";
      return "#b3b3b3";
    }};
    display: flex;
    font-size: 15px;
    flex-wrap: wrap;
    background-color: ${(props) => {
      if (props.theme.theme === "light") return "#F1F1F1";
      return "#404040";
    }};
    border: 4px solid
      ${(props) => {
        if (props.theme.theme === "light") return "#e6e6e6";
        return "#303030";
      }};
    position: absolute;
    left: -2rem;
    top: 0;
    text-align: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    text-indent: 0;
  }
  &: hover {
    background-color: ${(props) => {
      if (props.theme.theme === "light") return "#ffc";
      return "#212121";
    }};
  }
`;

const ListItemInfo = styled.span`
  @media (min-width: 1020px) {
    font-size: 1rem;
  }
  @media (max-width: 1020px) {
    font-size: 0.65rem;
  }
`;

function Post({ post, animationOrder }) {
  console.log(animationOrder);
  return (
    <PostCard animationOrder={animationOrder}>
      <List>
        <ListItem
          comments={post && post?.kids && post?.kids.length}
          link={post?.url}
          score={post?.score}
        >
          <ListTitle>
            <a href={post?.url}>{truncateString(post?.title, 75, true)}</a>
          </ListTitle>
          {post?.url && (
            <ListLinkName>
              ({truncateString(post?.url, 100, true)})
            </ListLinkName>
          )}
          <br />
          <ListItemInfo>
            <StyledLink to={`/user?id=${post?.by}`}>by {post?.by}</StyledLink>
            {" | "}
            {moment.unix(post?.time).format("YYYY-MM-DD")}
            {" | "}
            <StyledLink to={`/post?id=${post?.id}`}>
              comments {post?.kids?.length}
            </StyledLink>
          </ListItemInfo>
        </ListItem>
      </List>
    </PostCard>
  );
}

export default Post;
