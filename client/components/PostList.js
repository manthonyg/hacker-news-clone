import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import moment from 'moment';
import PostSkeleton from './PostSkeleton';

const List = styled.ol`
  list-style: none;
  counter-reset: item;
  margin-bottom: 20px;
  max-width: 600px;
`;

const ListTitle = styled.span`
  font-weight: 700;
  font-size: 1em;
  color: #bb86fc;
`;
const ListItem = styled.li`
  margin: 2em;
  padding-left: 25px;
  position: relative;
  margin-bottom: 10px;

  &: before {
    content: '${props => {
      if (props.link) return '🔗';
      if (props.comments > 50) return '🔥';
      if (props.link && props.comments > 20) return '🔗🔥';
      if (props.comments === 0) return '🧊';
      return '';
    }}';
    counter-increment: item;
    position: absolute;
    left: 0;
    top: 0;
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    font-size: 10px;
    color: #fff;
    border-radius: 50%;
    text-indent: 0;
  }
  &: hover {
    background-color: #ffc;
  }
`;

function PostList({ posts, isLoading }) {
  return (
    <>
      {isLoading ? (
        <PostSkeleton numberOfSkeletons={10} />
      ) : (
        <List>
          {posts &&
            !!posts.length &&
            posts.map(post => {
              return (
                <>
                  <ListItem
                    comments={post && post.kids && post.kids.length}
                    link={post.url}
                  >
                    <ListTitle>
                      <a href={post.url}>{post.title}</a>
                    </ListTitle>
                    <br />
                    <span>
                      <Link to={`/user?id=${post.by}`}>by {post.by}</Link>
                      at {moment.unix(post.time).format('YYYY-MM-DD')}
                    </span>

                    <Link to={`/post?id=${post.id}`}>
                      {post.descendants} comments
                    </Link>
                  </ListItem>
                </>
              );
            })}
        </List>
      )}
    </>
  );
}

export default PostList;
