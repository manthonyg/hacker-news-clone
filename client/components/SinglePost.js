/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import { fetchComments, fetchItem } from '../utils/api';
import Comment from './Comment';
import Flex from './common/Flex';

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
        <h1>LOADING...</h1>
      ) : (
        <>
          {post && (
            <>
              <p>by {post.by}</p>
              <p>at {post.time}</p>
              <p>title: {post.title}</p>
              <p>text: {post.text}</p>
            </>
          )}
          <Flex>
            {comments.map(comment => (
              <Comment
                key={comment.id}
                id={comment.id}
                text={comment.text}
                by={comment.by}
                time={comment.time}
              />
            ))}
          </Flex>
        </>
      )}
    </>
  );
}

export default SinglePost;
