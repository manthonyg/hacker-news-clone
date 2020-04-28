import React, { useState, useEffect } from 'react';
import { fetchComments, fetchItem } from '../utils/api';

function SinglePost({ id, comments }) {
  const [item, setItem] = useState([]);

  console.log('id', id);

  useEffect(() => {
    fetchItem(id).then(response => {
      console.log(response);
      setItem(response);
    });
    // fetchComments(comments).then(response => {
    //   console.log(response);
    // });
  }, []);

  return (
    <>
      <pre>{item}</pre>
    </>
  );
}

export default SinglePost;
