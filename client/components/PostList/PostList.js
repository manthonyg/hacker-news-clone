import React from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import moment from "moment";
import { truncateString } from "../../utils/truncate";
import Post from "../Post/Post";

function PostList({ posts }) {
  console.log(posts);
  return (
    <>{posts && posts.length && posts.map((post) => <Post post={post} />)}</>
  );
}

export default PostList;
