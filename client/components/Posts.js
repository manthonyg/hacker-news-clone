import React from 'react';
import styled from 'styled-components';

function Posts({ list }) {
  return (
    <>
      <h1>Posts</h1>
      <ul>
        <li>
          <p>Post about something! </p>
          <pre>
            By some guy here <a>Link to the user</a>
          </pre>
        </li>
      </ul>
    </>
  );
}

export default Posts;
