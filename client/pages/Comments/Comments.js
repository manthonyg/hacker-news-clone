/* eslint-disable no-console */
import React, { useState, useEffect, useRef } from "react";
import queryString from "query-string";
import Loader from "../../components/common/Loader/Loader";
import { fetchComments, fetchItem } from "../../utils/api";
import Flex from "../../components/common/Flex/Flex";
import Heading from "../../components/common/Heading/Heading";
import PostSkeleton from "../Posts/PostSkeleton";
import Post from "../../components/Post/Post";
import CommentList from "../../components/CommentList/CommentList";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import ScrollArrow from "../../components/ScrollArrow/ScrollArrow";

function Comments() {
  const INFINITE_SCROLL_FETCH_AMOUNT = 10;
  const { id } = queryString.parse(location.search);
  const [comments, setComments] = useState([]);
  const [commentIds, setCommentIds] = useState([]);
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useInfiniteScroll(() =>
    handleInfiniteScroll()
  );
  const [hasComments, setHasComments] = useState(true);
  const componentIsMounted = useRef(true);

  useEffect(() => {
    if (componentIsMounted.current) {
      setIsLoading(true);
      fetchItem(id)
        .then((post) => {
          setPost(post);
          setCommentIds(post?.kids);
          return fetchComments(
            post?.kids.slice(0, INFINITE_SCROLL_FETCH_AMOUNT) || []
          );
        })
        .then((comments) => {
          setComments(comments);
          setIsLoading(false);
        })
        .catch((error) => {
          console.warn("There was a problem gathering these resources", error);
        });
    }
    return () => {
      componentIsMounted.current = false;
    };
  }, []);

  const checkIfHasComments = () => {
    if (comments.length >= commentIds.length) {
      setHasComments(false);
    }
  };
  const handleInfiniteScroll = () => {
    if (hasComments) {
      setTimeout(() => {
        const currentCommentLength = comments.length;
        fetchComments(
          commentIds.slice(
            currentCommentLength - 1,
            currentCommentLength + INFINITE_SCROLL_FETCH_AMOUNT
          )
        ).then((response) => {
          setComments(comments.concat(response));
          setIsFetching(false);
          checkIfHasComments();
        });
      }, 1000);
    }
  };

  return (
    <>
      {isLoading ? (
        <Flex>
          <Heading h5>viewing:</Heading>
          <PostSkeleton numberOfSkeletons={1} />
          <Heading h5>comments: (...)</Heading>
          <PostSkeleton numberOfSkeletons={10} noEmoji />
        </Flex>
      ) : (
        <>
          <Heading h5>viewing:</Heading>
          {post && <Post post={post} />}
          {comments && (
            <Heading h5 isSticky>
              comments ({comments?.length - 1} of {commentIds?.length}):
            </Heading>
          )}

          <div style={{ overflow: "auto" }}>
            <CommentList comments={comments} />
            {isFetching && hasComments && (
              <>
                <Heading h5>Loading comments...</Heading>
                <Loader />
              </>
            )}

            {!hasComments && <Heading h4>no more comments</Heading>}
          </div>
          <ScrollArrow />
        </>
      )}
    </>
  );
}

export default Comments;
