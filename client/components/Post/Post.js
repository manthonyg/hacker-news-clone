import React from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { truncateString } from "../../utils/truncate";
import moment from "moment";

const fadeIn = keyframes`
from {
  opacity: 0;
}

to {
  opacity: 1;
}
}
`;

const PostCard = styled.div`
  display: flex;
  align-content: center;
  width: 100%;
  height: 100px;
  background-color: ${(props) => {
    if (props.theme.theme === "light") return "#FFFFFF";
    return "#282828";
  }};
  border-bottom: ${(props) => {
    if (props.theme.theme === "light") return "1px solid #c3c3c3";
    return "1px solid #404040";
  }};
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
  font-size: 1.2rem;
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
  animation: ${fadeIn} 500ms linear;
  &: before {
    content: "${(props) => {
      if (props.score > 100) return "🔥" + " " + "+" + props.score;
      if (props.score < 10) return "🧊" + " " + "+" + props.score;
      if (props.score >= 10 && props.score < 99)
        return "👶" + " " + "+" + props.score;
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
  font-size: 0.9rem;
`;

function Post({ post }) {
  return (
    <PostCard>
      <List>
        <ListItem
          comments={post && post?.kids && post?.kids.length}
          link={post?.url}
          score={post?.score}
        >
          <ListTitle>
            <a href={post?.url}>{truncateString(post?.title, 60)}</a>
          </ListTitle>
          {post?.url && (
            <ListLinkName>({truncateString(post?.url, 30, true)})</ListLinkName>
          )}
          <br />
          <ListItemInfo>
            <StyledLink to={`/user?id=${post?.by}`}>by {post?.by}</StyledLink>
            {" | "}
            {moment.unix(post?.time).format("YYYY-MM-DD")}
            {" | "}
            <StyledLink to={`/post?id=${post?.id}`}>
              comments {post?.descendants}
            </StyledLink>
          </ListItemInfo>
        </ListItem>
      </List>
    </PostCard>
  );
}

export default Post;
