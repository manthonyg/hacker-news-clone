import React from 'react';

function PostList({ posts }) {
  return (
    <ul>
      {posts &&
        !!posts.length &&
        posts.map(post => {
          return (
            <>
              <li>{post.title}</li>
              <li>
                by {post.by} on {post.time} with 12 comments
              </li>
            </>
          );
        })}
    </ul>
  );
}

export default PostList;
