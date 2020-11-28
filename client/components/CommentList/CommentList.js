import React from "react";
import Comment from "../Comments/Comment";

function CommentList({ comments }) {
  return (
    <>
      {comments &&
        !!comments.length &&
        comments.map((comment, idx) => (
          <Comment key={`${comment?.by.slice(-5)}${idx}`} comment={comment} />
        ))}
    </>
  );
}

export default CommentList;
