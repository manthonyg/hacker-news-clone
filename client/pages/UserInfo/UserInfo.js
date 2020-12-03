import React, { useEffect, useState, useRef } from "react";
import queryString from "query-string";
import moment from "moment";
import { fetchUser, fetchPosts } from "../../utils/api";
import PostList from "../../components/PostList/PostList";
import Card from "../../components/common/Card/Card";
import Flex from "../../components/common/Flex/Flex";
import UserInfoSkeleton from "./UserInfoSkeleton";
import PostsSkeleton from "../Posts/PostSkeleton";
import { truncateString } from "../../utils/truncate";
import Button from "../../components/common/Button/Button";
import Grid from "../../components/common/Grid/Grid";
import GridItem from "../../components/common/Grid/GridItem";
import Heading from "../../components/common/Heading/Heading";

function UserInfo() {
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
        .then((incomingUser) => {
          setUser(incomingUser);
          setUserLoading(false);

          return fetchPosts(incomingUser.submitted.slice(0, 10));
        })
        .then((incomingPosts) => {
          setPosts(incomingPosts || []);
          setPostsLoading(false);
        })
        .catch((error) => {
          setErrorMessage("Error fetching user data.", error);
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
          <Card noMargin>
            <Grid cols="45% 45%" rows="33% 33% 33%">
              <GridItem col="1" row="1">
                <h3>{user?.id}</h3>
                <Heading h5>
                  joined: {moment.unix(user.created).format("YYYY-MM-DD")}
                </Heading>
                {user.about && user.about.length && (
                  <Button type="button" onClick={toggleTruncate}>
                    {isTruncated ? "more" : "less"}
                  </Button>
                )}
              </GridItem>
              <GridItem col="2" row="1">
                <Heading h5>karma: {user?.karma}</Heading>
                <Heading h5>posts: {user?.submitted.length}</Heading>
              </GridItem>
              <GridItem col="2" row="2">
                <Heading
                  h5
                  dangerouslySetInnerHTML={{
                    __html: truncateString(user.about, 50, isTruncated),
                  }}
                />
              </GridItem>
            </Grid>
          </Card>
        </Flex>
      )}
      <Heading h4>recent posts</Heading>
      {postsLoading === true ? (
        <PostsSkeleton numberOfSkeletons={10} />
      ) : (
        <PostList posts={posts} />
      )}
    </>
  );
}

export default UserInfo;
