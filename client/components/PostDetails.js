/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import moment from 'moment';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchComments, fetchItem } from '../utils/api';
import Comment from './Comment';
import Flex from './common/Flex';
import UserInfoSkeleton from './UserInfoSkeleton';
import Heading from './common/Heading';
import PostSkeleton from './PostSkeleton';

const StyledLink = styled(Link)`
  text-decoration: underline;
  color: #bb86fc;
  font-weight: 800;
`;

function SinglePost() {
  // eslint-disable-next-line no-restricted-globals
  const { id } = queryString.parse(location.search);

  const [comments, setComments] = useState([]);
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchItem(id)
      .then(userpost => {
        setPost(userpost);
        return fetchComments(userpost.kids || []);
      })
      .then(usercomments => {
        setComments(usercomments);
        setIsLoading(false);
      })
      .catch(error => {
        console.warn('There was a problem gathering these resources', error);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <>
          <PostSkeleton numberOfSkeletons={1} noEmoji />
          <UserInfoSkeleton numberOfSkeletons={3} />
        </>
      ) : (
        <>
          {post && (
            <>
              <Heading h4 noMargin>
                {post.title}
              </Heading>
              <Heading h5>
                by <StyledLink to={`/user?id=${post.by}`}>{post.by}</StyledLink>{' '}
                at {moment.unix(post.time).format('YYYY-MM-DD')}
                title: {post.title}
              </Heading>
            </>
          )}
          <Flex>
            {comments && comments.length ? (
              comments.map(comment => (
                <Comment
                  key={comment.id}
                  id={comment.id}
                  text={comment.text}
                  by={comment.by}
                  time={comment.time}
                />
              ))
            ) : (
              <Heading>No Comments</Heading>
            )}
          </Flex>
        </>
      )}
    </>
  );
}

export default SinglePost;
