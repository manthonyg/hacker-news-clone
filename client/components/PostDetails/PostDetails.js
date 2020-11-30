/* eslint-disable no-console */
import React, { useState, useEffect, useRef } from "react";
import queryString from "query-string";
import Loader from "../common/Loader/Loader";
import { fetchComments, fetchItem } from "../../utils/api";
import Flex from "../common/Flex/Flex";
import Heading from "../common/Heading/Heading";
import PostSkeleton from "../Posts/PostSkeleton";
import Post from "../Post/Post";
import CommentList from "../CommentList/CommentList";
import InfiniteScroll from "react-infinite-scroll-component";
import ScrollArrow from "../ScrollArrow/ScrollArrow";

function PostDetails() {
  const INFINITE_SCROLL_FETCH_AMOUNT = 10;
  const { id } = queryString.parse(location.search);
  const [comments, setComments] = useState([]);
  const [commentIds, setCommentIds] = useState([]);
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleInfiniteScroll = () => {
    const currentCommentLength = comments.length;
    fetchComments(
      commentIds.slice(
        currentCommentLength - 1,
        currentCommentLength + INFINITE_SCROLL_FETCH_AMOUNT
      )
    ).then((response) => setComments(comments.concat(response)));
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
              comments ({comments?.length} of {commentIds?.length}):
            </Heading>
          )}

          <InfiniteScroll
            style={{ overflow: "auto" }}
            dataLength={comments?.length}
            next={handleInfiniteScroll}
            hasMore={comments?.length <= commentIds?.length - 1}
            scrollThreshold={0.95}
            loader={
              <>
                <Heading h5>Loading comments...</Heading>
                <Loader />
              </>
            }
            endMessage={<Heading h4>no more comments</Heading>}
          >
            <CommentList comments={comments} />
          </InfiniteScroll>
          <ScrollArrow />
        </>
      )}
    </>
  );
}

export default PostDetails;
