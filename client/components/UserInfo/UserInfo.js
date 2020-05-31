import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import moment from 'moment';
import { fetchUser, fetchPosts } from '../../utils/api';
import PostList from '../PostList/PostList';
import Card from '../common/Card/Card';
import UserInfoSkeleton from './UserInfoSkeleton';
import PostsSkeleton from '../Posts/PostSkeleton';

function UserInfo() {
  // eslint-disable-next-line no-restricted-globals
  const { id } = queryString.parse(location.search);

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  const [errorMessage, setErrorMessage] = useState(null);

  const [postsLoading, setPostsLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    fetchUser(id)
      .then(incomingUser => {
        setUser(incomingUser);
        setUserLoading(false);

        return fetchPosts(incomingUser.submitted.slice(0, 10));
      })
      .then(incomingPosts => {
        setPosts(incomingPosts || []);
        setPostsLoading(false);
      })
      .catch(error => {
        setErrorMessage('Error fetching user data.', error);
        setPostsLoading(false);
        setUserLoading(false);
      });
  }, []);

  return (
    <>
      {errorMessage && <p>{errorMessage}</p>}

      {userLoading === true ? (
        <UserInfoSkeleton numberOfSkeletons={1} />
      ) : (
        <Card primary>
          <h1>{user.id}</h1>
          <p>joined: {moment.unix(user.created).format('YYYY-MM-DD')}</p>
          <p>karma: {user.karma}</p>
          <p>posts: {user.submitted.length}</p>
          <p dangerouslySetInnerHTML={{ __html: user.about }} />
        </Card>
      )}

      {postsLoading === true ? (
        <PostsSkeleton numberOfSkeletons={10} />
      ) : (
        <PostList posts={posts} />
      )}
    </>
  );
}

export default UserInfo;
