import React from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import moment from "moment";
import { truncateString } from "../../utils/truncate";

const fadeIn = keyframes`
from {
  opacity: 0;
}

to {
  opacity: 1;
}
}
`;

const StyledLink = styled(Link)`
  text-decoration: underline;
  color: #bb86fc;
  font-weight: 800;
`;
const List = styled.ol`
  list-style: none;
  counter-reset: item;
  margin-bottom: 20px;
`;

const ListTitle = styled.span`
  font-weight: 700;
  color: #bb86fc;
`;
const ListItem = styled.li`
  padding-left: 25px;
  position: relative;
  animation: ${fadeIn} 500ms linear;
  margin-bottom: 1em;
  &: before {
    content: "${(props) => {
      if (props.link && props.comments > 40) return "🔥";
      if (props.comments > 30) return "🔥";
      if (props.comments === 1) return "🧊";
      if (props.comments > 10) return "👶";
      return "";
    }}";
    counter-increment: item;
    position: absolute;
    left: 0;
    top: 0;
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    color: #fff;
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
  font-size: 0.8rem;
`;

function PostList({ posts }) {
  return (
    <List>
      {posts &&
        !!posts.length &&
        posts.map((post) => {
          return (
            <ListItem
              comments={post && post?.kids && post?.kids.length}
              link={post?.url}
            >
              <ListTitle>
                <a href={post?.url}>{truncateString(post?.title, 60)}</a>
              </ListTitle>
              <br />
              <ListItemInfo>
                <StyledLink to={`/user?id=${post?.by}`}>
                  by {post?.by}
                </StyledLink>
                {" | "}
                {moment.unix(post?.time).format("YYYY-MM-DD")}
                {" | "}
                <StyledLink to={`/post?id=${post?.id}`}>
                  comments {post?.descendants}
                </StyledLink>
                {" | "}
                points {post?.score}
              </ListItemInfo>
            </ListItem>
          );
        })}
    </List>
  );
}

export default PostList;
