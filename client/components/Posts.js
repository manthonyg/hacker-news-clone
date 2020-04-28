/* eslint-disable no-console */
import React from 'react';
import propTypes from 'prop-types';
import PostList from './PostList';
import { fetchMainPosts } from '../utils/api';
import Loader from './common/Loader';
import Flex from './common/Flex';
import '../index.css';
import PostSkeleton from './PostSkeleton';

export default class Posts extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isLoading: false, posts: [] };
    this.handleFetch = this.handleFetch.bind(this);
    const { type } = this.props;
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    this.handleFetch();
  }

  componentDidUpdate(previousProps) {
    if (previousProps.type !== this.props.type) {
      this.handleFetch();
    }
  }

  handleFetch() {
    this.setState({ isLoading: true, posts: null });
    fetchMainPosts(this.props.type).then(data => {
      console.log(data);

      this.setState({ posts: data, isLoading: false });
    });
  }

  render() {
    const { isLoading, posts } = this.state;
    return (
      <>
        <Flex justifyCenter>
          {isLoading && (
            <>
              <PostSkeleton numberOfSkeletons={20} />
            </>
          )}
        </Flex>

        <PostList posts={posts} />
      </>
    );
  }
}
