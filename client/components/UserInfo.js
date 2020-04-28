import React from 'react';
import queryString from 'query-string'


function UserInfo({ match }) {
  return (
    <>
      <h1>{match.params.user}</h1>
      <pre>joined: TIMESTAMP karma: 92912 </pre>
      <pre>email: userName69@hotmail.com</pre>
    </>
  );
}

export default UserInfo;

/*TODO: make this into a class component use this.props.search and query
string to parse the search and use in the component
