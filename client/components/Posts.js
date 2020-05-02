/* eslint-disable no-console */
import React from 'react';
import PostList from './PostList';
import { fetchMainPosts } from '../utils/api';
import '../index.css';
import PostSkeleton from './PostSkeleton';

export default class Posts extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isLoading: false, posts: [] };
    this.handleFetch = this.handleFetch.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    this.handleFetch();
  }

  componentDidUpdate(previousProps) {
    const { type } = this.props;
    if (previousProps.type !== type) {
      this.handleFetch();
    }
  }

  handleFetch() {
    const { type } = this.props;
    this.setState({ isLoading: true, posts: null });
    fetchMainPosts(type).then(data => {
      console.log(data);

      this.setState({ posts: data, isLoading: false });
    });
  }

  render() {
    const { isLoading, posts } = this.state;
    return (
      <>
        {isLoading && (
          <>
            <PostSkeleton numberOfSkeletons={20} />
          </>
        )}

        <PostList posts={posts} isLoading={isLoading} />
      </>
    );
  }
}
