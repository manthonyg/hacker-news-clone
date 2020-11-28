/* eslint-disable no-console */
import React, { useState, useEffect } from "react";
import queryString from "query-string";
import moment from "moment";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchComments, fetchItem } from "../../utils/api";
import Comment from "../Comments/Comment";
import Flex from "../common/Flex";
import UserInfoSkeleton from "../UserInfo/UserInfoSkeleton";
import Heading from "../common/Heading/Heading";
import PostSkeleton from "../Posts/PostSkeleton";
import Post from "../Post/Post";
const StyledLink = styled(Link)`
  text-decoration: underline;
  color: #bb86fc;
  font-weight: 800;
`;

function SinglePost() {
  const { id } = queryString.parse(location.search);
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchItem(id)
      .then((userpost) => {
        setPost(userpost);
        return fetchComments(userpost.kids || []);
      })
      .then((comments) => {
        setComments(comments);
        setIsLoading(false);
      })
      .catch((error) => {
        console.warn("There was a problem gathering these resources", error);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <>
          <Heading h5>viewing:</Heading>
          <PostSkeleton numberOfSkeletons={1} />
          <Heading h5>comments: (...)</Heading>
          <PostSkeleton numberOfSkeletons={10} noEmoji />
        </>
      ) : (
        <>
          <Heading h5>viewing:</Heading>
          {post && <Post post={post} />}
          <Flex>
            {comments && <Heading h5>Comments ({comments.length}):</Heading>}
            {comments && comments.length ? (
              comments.map((comment) => (
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
