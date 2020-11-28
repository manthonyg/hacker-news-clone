/* eslint-disable no-console */
import React, { useState, useEffect } from "react";
import queryString from "query-string";
import Loader from "../common/Loader/Loader";
import { fetchComments, fetchItem } from "../../utils/api";
import Flex from "../common/Flex";
import Heading from "../common/Heading/Heading";
import PostSkeleton from "../Posts/PostSkeleton";
import Post from "../Post/Post";
import CommentList from "../CommentList/CommentList";
import InfiniteScroll from "react-infinite-scroll-component";

function SinglePost() {
  const INFINITE_SCROLL_FETCH_AMOUNT = 10;
  const { id } = queryString.parse(location.search);
  const [comments, setComments] = useState([]);
  const [commentIds, setCommentIds] = useState([]);
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  console.log(comments);
  useEffect(() => {
    setIsLoading(true);
    fetchItem(id)
      .then((userpost) => {
        setPost(userpost);
        setCommentIds(userpost?.kids);
        return fetchComments(
          userpost?.kids.slice(0, INFINITE_SCROLL_FETCH_AMOUNT) || []
        );
      })
      .then((comments) => {
        setComments(comments);
        setIsLoading(false);
      })
      .catch((error) => {
        console.warn("There was a problem gathering these resources", error);
      });
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
            {comments && (
              <Heading h5>
                comments ({comments.length} of {commentIds.length}):
              </Heading>
            )}

            <InfiniteScroll
              style={{ overflow: "auto" }}
              dataLength={comments.length} //This is important field to render the next data
              next={handleInfiniteScroll}
              hasMore={comments?.length <= commentIds?.length}
              scrollThreshold={0.95}
              loader={
                <>
                  <Heading h5>Loading...</Heading>
                  <Loader />
                </>
              }
              endMessage={<Heading>no more comments</Heading>}
            >
              <CommentList comments={comments} />
            </InfiniteScroll>
          </Flex>
        </>
      )}
    </>
  );
}

export default SinglePost;
