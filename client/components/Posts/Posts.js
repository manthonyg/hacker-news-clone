import React, { useState, useEffect, useRef } from "react";
import PostList from "../PostList/PostList";
import { fetchMainPosts, fetchPostIds, fetchPosts } from "../../utils/api";
import Loader from "../common/Loader/Loader";
import InfiniteScroll from "react-infinite-scroll-component";
import Heading from "../common/Heading/Heading";
import Header from "../common/Heading/Heading";
import PropTypes from "prop-types";
import {
  POST_CATEGORY_TEXT,
  POST_LOADER_MESSAGE,
  POST_END_MESSAGE,
} from "../../test_utils/testIds";

function Posts(props) {
  const { type } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [postIds, setPostIds] = useState([]);
  const INFINITE_SCROLL_FETCH_AMOUNT = 10;

  const componentIsMounted = useRef(true);

  useEffect(() => {
    if (componentIsMounted.current) {
      setIsLoading(true);
      fetchMainPosts(type).then((response) => {
        setPosts(response);
        setIsLoading(false);
      });

      fetchPostIds(type)
        .then((response) => setPostIds(response))
        .catch((error) => console.log(error));
    }
    return () => (componentIsMounted.current = true);
  }, [props.type]);

  const handleInfiniteScroll = () => {
    const currentPostLength = posts.length;
    fetchPosts(
      postIds.slice(
        currentPostLength,
        currentPostLength + INFINITE_SCROLL_FETCH_AMOUNT + 1
      )
    ).then((response) => setPosts(posts.concat(response)));
  };

  return (
    <>
      {isLoading ? (
        <>
          <Header data-testid={POST_LOADER_MESSAGE} h5>
            loading {type}...
          </Header>
          <Loader />
        </>
      ) : (
        <>
          <Heading data-testid={POST_CATEGORY_TEXT} isSticky h5>
            viewing {type} ({posts.length} of {postIds.length})
          </Heading>
          <InfiniteScroll
            style={{ overflow: "auto" }}
            dataLength={posts.length} //This is important field to render the next data
            next={handleInfiniteScroll}
            hasMore={posts?.length < postIds?.length}
            scrollThreshold={0.95}
            loader={
              <>
                <Header data-testid={POST_LOADER_MESSAGE} h5>
                  loading {type}...
                </Header>
                <Loader />
              </>
            }
            endMessage={
              <Heading data-testid={POST_END_MESSAGE} h4>
                no more posts
              </Heading>
            }
          >
            <PostList posts={posts} category={type} />
          </InfiniteScroll>
        </>
      )}
    </>
  );
}

Posts.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Posts;
