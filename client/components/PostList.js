import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const moment = require('moment');

const Post = styled.ul`
  list-style: none;
  padding: 0.25em;
  margin: 0.25em;
  font-family: 'Roboto', sans-serif;
`;
const Title = styled.li`
  font-size: 1.25em;
  list-style: none;
  color: maroon;
  margin-top: 0.75em;
  padding: 0.25em;
  font-family: 'Roboto', sans-serif;
  &:nth-of-type(2n + 1) {
    background-color: #ccc;
  }
  & a {
    text-decoration: none;
    color: maroon;
  }
`;

const MetaData = styled.li`
  font-size: 1em;
  list-style: none;
  color: #ccc;
  margin-bottom: 0.75em;
`;

function PostList({ posts }) {
  return (
    <Post>
      {posts &&
        !!posts.length &&
        posts.map(post => {
          return (
            <>
              <Title>
                <a href={post.url}>{post.title}</a>
              </Title>
              <MetaData>
                by <Link to={`/user?id=${post.by}`}>{post.by}</Link> on
                {moment.unix(post.time).format()} with 12 comments
              </MetaData>
            </>
          );
        })}
    </Post>
  );
}

export default PostList;
