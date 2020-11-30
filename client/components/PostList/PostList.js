import React from "react";
import Post from "../Post/Post";
import PropTypes from "prop-types";

function PostList({ posts, category }) {
  return (
    <>
      {posts &&
        !!posts.length &&
        posts.map((post, idx) => (
          <Post
            category={category}
            key={`${post?.by.slice(-5)}${idx}`}
            animationOrder={(idx + 1 * 50) % 500}
            post={post}
          />
        ))}
    </>
  );
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      url: PropTypes.string,
      score: PropTypes.number.isRequired,
      kids: PropTypes.array,
      by: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      time: PropTypes.number.isRequired,
    })
  ),
};

export default PostList;
