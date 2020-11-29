import React from "react";
import Comment from "../Comments/Comment";
import PropTypes from "prop-types";

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

CommentList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      by: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      time: PropTypes.number.isRequired,
    })
  ),
};

export default CommentList;
