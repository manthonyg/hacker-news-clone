import React from "react";
import Post from "../Post/Post";

function PostList({ posts }) {
  return (
    <>
      {posts &&
        !!posts.length &&
        posts.map((post, idx) => (
          <Post
            key={`${post?.by.slice(-5)}${idx}`}
            animationOrder={(idx + 1 * 50) % 500}
            post={post}
          />
        ))}
    </>
  );
}

export default PostList;
