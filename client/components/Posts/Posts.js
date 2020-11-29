import React, { useState, useEffect, useRef } from "react";
import PostList from "../PostList/PostList";
import { fetchMainPosts, fetchPostIds, fetchPosts } from "../../utils/api";
import Loader from "../common/Loader/Loader";
import InfiniteScroll from "react-infinite-scroll-component";
import Heading from "../common/Heading/Heading";
import Header from "../common/Heading/Heading";
import PropTypes from "prop-types";
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
    return () => (componentIsMounted.current = false);
  }, [type]);

  const handleInfiniteScroll = () => {
    const currentPostLength = posts.length;
    fetchPosts(
      postIds.slice(
        currentPostLength - 1,
        currentPostLength + INFINITE_SCROLL_FETCH_AMOUNT
      )
    ).then((response) => setPosts(posts.concat(response)));
  };

  return (
    <>
      {isLoading ? (
        <>
          <Header h5>Loading {type}...</Header>
          <Loader />
        </>
      ) : (
        <InfiniteScroll
          style={{ overflow: "auto" }}
          dataLength={posts.length} //This is important field to render the next data
          next={handleInfiniteScroll}
          hasMore={posts?.length < postIds?.length}
          scrollThreshold={0.95}
          loader={
            <>
              <Header h5>Loading {type}...</Header>
              <Loader />
            </>
          }
          endMessage={<Heading>No more posts!</Heading>}
        >
          <PostList posts={posts} />
        </InfiniteScroll>
      )}
    </>
  );
}

Posts.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Posts;
