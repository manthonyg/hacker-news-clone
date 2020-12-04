import React, { useState, useEffect, useRef } from "react";
import PostList from "../../components/PostList/PostList";
import { fetchMainPosts, fetchPostIds, fetchPosts } from "../../utils/api";
import Loader from "../../components/common/Loader/Loader";
import InfiniteScroll from "react-infinite-scroll-component";
import Heading from "../../components/common/Heading/Heading";
import Header from "../../components/common/Heading/Heading";
import PropTypes from "prop-types";
import {
  POST_CATEGORY_TEXT,
  POST_LOADER_MESSAGE,
  POST_END_MESSAGE,
} from "../../test_utils/testIds";
import ScrollArrow from "../../components/ScrollArrow/ScrollArrow";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";

function Posts(props) {
  const { type } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [postIds, setPostIds] = useState([]);
  const INFINITE_SCROLL_FETCH_AMOUNT = 10;
  const [isFetching, setIsFetching] = useInfiniteScroll(() =>
    handleInfiniteScroll()
  );
  const [hasPosts, setHasPosts] = useState(true);
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

  const checkIfHasPosts = () => {
    console.log("checking for posts");
    if (posts.length >= postIds.length) {
      setHasPosts(false);
    }
  };

  const handleInfiniteScroll = () => {
    if (hasPosts) {
      setTimeout(() => {
        const currentPostLength = posts.length;
        fetchPosts(
          postIds.slice(
            currentPostLength,
            currentPostLength + INFINITE_SCROLL_FETCH_AMOUNT + 1
          )
        ).then((response) => {
          setPosts(posts.concat(response));
          setIsFetching(false);
          checkIfHasPosts();
        });
      }, 200);
    }
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
          <PostList posts={posts} category={type} />

          {isFetching && hasPosts && (
            <>
              <Heading h5 data-testid={POST_LOADER_MESSAGE}>
                loading {type}...
              </Heading>
              <Loader />
            </>
          )}

          {!hasPosts && (
            <Heading h4 data-testid={POST_END_MESSAGE}>
              no more posts
            </Heading>
          )}
          <ScrollArrow />
        </>
      )}
    </>
  );
}

Posts.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Posts;
