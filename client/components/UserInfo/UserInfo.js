import React, { useEffect, useState, useRef } from 'react';
import queryString from 'query-string';
import moment from 'moment';
import { fetchUser, fetchPosts } from '../../utils/api';
import PostList from '../PostList/PostList';
import Card from '../common/Card/Card';
import Flex from '../common/Flex';
import UserInfoSkeleton from './UserInfoSkeleton';
import PostsSkeleton from '../Posts/PostSkeleton';
import { truncateString } from '../../utils/truncate';
import Button from '../common/Button/Button';

function UserInfo() {
  // eslint-disable-next-line no-restricted-globals
  const { id } = queryString.parse(location.search);

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isTruncated, setIsTruncated] = useState(true);

  const [errorMessage, setErrorMessage] = useState(null);

  const [postsLoading, setPostsLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true);

  const componentIsMounted = useRef(true);

  useEffect(() => {
    if (componentIsMounted.current) {
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
    }
    return () => {
      componentIsMounted.current = false;
    };
  }, []);

  const toggleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  return (
    <>
      {errorMessage && <p>{errorMessage}</p>}

      {userLoading === true ? (
        <UserInfoSkeleton numberOfSkeletons={1} />
      ) : (
        <Flex justifyCenter>
          <Card primary>
            <h1>{user.id}</h1>
            <p>joined: {moment.unix(user.created).format('YYYY-MM-DD')}</p>
            <p>karma: {user.karma}</p>
            <p>posts: {user.submitted.length}</p>
            <p
              dangerouslySetInnerHTML={{
                __html: truncateString(user.about, 10, isTruncated)
              }}
            />

            {user.about && user.about.length && (
              <Button type="button" onClick={toggleTruncate}>
                {isTruncated ? 'more' : 'less'}
              </Button>
            )}
          </Card>
        </Flex>
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
