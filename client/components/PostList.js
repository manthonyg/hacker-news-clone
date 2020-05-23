import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import moment from 'moment';
import PostSkeleton from './PostSkeleton';

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
      if (props.link && props.comments > 40) return '🔗🔥';
      if (props.comments > 30) return '🔥';
      if (props.comments === 1) return '🧊';
      if (props.comments > 10) return '👶';
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
   background-color: ${props => {
     if (props.theme.theme === 'light') return '#ffc';
     return '#212121';
   }};

  }
`;

function PostList({ posts, isLoading }) {
  return (
    <>
      {isLoading ? (
        <PostSkeleton numberOfSkeletons={12} />
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
                      <StyledLink to={`/user?id=${post.by}`}>
                        by {post.by}
                      </StyledLink>{' '}
                      on {moment.unix(post.time).format('YYYY-MM-DD')}{' '}
                    </span>

                    <StyledLink to={`/post?id=${post.id}`}>
                      comments {post.descendants}
                    </StyledLink>
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
