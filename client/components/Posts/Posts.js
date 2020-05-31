/* eslint-disable no-console */
import React from 'react';
import PostList from '../PostList/PostList';
import { fetchMainPosts } from '../../utils/api';
import PostPagination from '../PostPagination/PostPagination';
import PostPaginationSkeleton from '../PostPagination/PostPaginationSkeleton';
import PostSkeleton from './PostSkeleton';

export default class Posts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      posts: [],
      currentPage: 1,
      postsPerPage: 10
    };
    this.handleFetch = this.handleFetch.bind(this);
    this.paginate = this.paginate.bind(this);
    this.pageForward = this.pageForward.bind(this);
    this.pageBack = this.pageBack.bind(this);
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
      this.setState({ posts: data, isLoading: false });
    });
  }

  paginate(pageNumber) {
    this.setState({ currentPage: pageNumber });
    console.log(this.state);
  }

  pageBack(pageNumber) {
    this.setState({ currentPage: pageNumber === 1 ? 1 : pageNumber - 1 });
  }

  pageForward(pageNumber) {
    this.setState({
      currentPage: pageNumber < 5 ? pageNumber + 1 : pageNumber
    });
  }

  render() {
    const { isLoading, posts, currentPage, postsPerPage } = this.state;
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts =
      posts && posts.slice(indexOfFirstPost, indexOfLastPost);

    return (
      <>
        {isLoading ? (
          <>
            <PostSkeleton numberOfSkeletons={10} />
            <PostPaginationSkeleton numberOfSkeletons={1} />
          </>
        ) : (
          <>
            <PostList posts={currentPosts} isLoading={isLoading} />

            <PostPagination
              totalPosts={posts.length}
              postsPerPage={postsPerPage}
              currentPage={currentPage}
              paginate={this.paginate}
              pageForward={this.pageForward}
              pageBack={this.pageBack}
              loading={isLoading}
            />
          </>
        )}
      </>
    );
  }
}
