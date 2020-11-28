/* eslint-disable no-console */
import React, { useState, useEffect } from "react";
import PostList from "../PostList/PostList";
import { fetchMainPosts, fetchPostIds, fetchPosts } from "../../utils/api";
import Loader from "../common/Loader/Loader";
import InfiniteScroll from "react-infinite-scroll-component";
import Heading from "../common/Heading/Heading";
import { wait } from "../../utils/wait";
import Header from "../common/Heading/Heading";

function Posts(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [postIds, setPostIds] = useState([]);
  const INFINITE_SCROLL_FETCH_AMOUNT = 10;

  useEffect(() => {
    setIsLoading(true);
    fetchMainPosts(props.type).then((response) => {
      setPosts(response);
      setIsLoading(false);
    });

    fetchPostIds(props.type)
      .then((response) => setPostIds(response))
      .catch((error) => console.log(error));
  }, [props.type]);

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
          <Header h5>Loading {props.type}...</Header>
          <Loader />
        </>
      ) : (
        <InfiniteScroll
          style={{ overflow: "auto" }}
          dataLength={posts.length} //This is important field to render the next data
          next={handleInfiniteScroll}
          hasMore={true}
          scrollThreshold={0.95}
          loader={
            <>
              <Header h5>Loading {props.type}...</Header>
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

export default Posts;
