/* eslint-disable no-console */
import React, { useState, useEffect } from "react";
import PostList from "../PostList/PostList";
import { fetchMainPosts, fetchPostIds, fetchPosts } from "../../utils/api";
import PostPagination from "../PostPagination/PostPagination";
import PostPaginationSkeleton from "../PostPagination/PostPaginationSkeleton";
import PostSkeleton from "./PostSkeleton";
import InfiniteScroll from "react-infinite-scroll-component";

function Posts(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [postIds, setPostIds] = useState([]);
  const INFINITE_SCROLL_FETCH_AMOUNT = 10;
  console.log(postIds);
  useEffect(() => {
    setIsLoading(true);
    fetchMainPosts(props.type).then((response) => {
      setPosts(response);
      setIsLoading(false);
    });

    fetchPostIds(props.type)
      .then((response) => setPostIds(response))
      .catch((error) => console.log(error));
  }, [props.type]);

  const handleInfiniteScroll = () => {
    const currentPostLength = posts.length;
    fetchPosts(
      postIds.slice(
        currentPostLength - 1,
        currentPostLength + INFINITE_SCROLL_FETCH_AMOUNT
      )
    ).then((response) => setPosts(posts.concat(response)));
  };

  return (
    <>
      {isLoading ? (
        <h4>Loading {props.type}...</h4>
      ) : (
        <InfiniteScroll
          dataLength={posts.length} //This is important field to render the next data
          next={handleInfiniteScroll}
          hasMore={true}
          loader={<h4>Loading posts...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <PostList posts={posts} />
        </InfiniteScroll>
      )}
    </>
  );
}

export default Posts;
// export default class Posts extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       isLoading: false,
//       posts: [],
//       currentPage: 1,
//       postsPerPage: 20,
//     };
//     this.handleFetch = this.handleFetch.bind(this);
//     this.paginate = this.paginate.bind(this);
//     this.pageForward = this.pageForward.bind(this);
//     this.pageBack = this.pageBack.bind(this);
//   }

//   componentDidMount() {
//     this.setState({ isLoading: true });
//     this.handleFetch();
//   }

//   componentDidUpdate(previousProps) {
//     const { type } = this.props;
//     if (previousProps.type !== type) {
//       this.handleFetch();
//     }
//   }

//   handleFetch() {
//     const { type } = this.props;
//     this.setState({ isLoading: true, posts: null });
//     fetchMainPosts(type).then((data) => {
//       this.setState({ posts: data, isLoading: false });
//     });
//   }

//   // paginate(pageNumber) {
//   //   this.setState({ currentPage: pageNumber });
//   //   console.log(this.state);
//   // }

//   // pageBack(pageNumber) {
//   //   this.setState({ currentPage: pageNumber === 1 ? 1 : pageNumber - 1 });
//   // }

//   // pageForward(pageNumber) {
//   //   this.setState({
//   //     currentPage: pageNumber < 20 ? pageNumber + 1 : pageNumber,
//   //   });
//   // }

//   render() {
//     // const { isLoading, posts, currentPage, postsPerPage } = this.state;
//     // const indexOfLastPost = currentPage * postsPerPage;
//     // const indexOfFirstPost = indexOfLastPost - postsPerPage;
//     // const currentPosts =
//     //   posts && posts.slice(indexOfFirstPost, indexOfLastPost);

//     return (
//       <>
//         {isLoading ? (
//           <>
//             <h4>Loading {this.props.type.toUpperCase()}...</h4>
//           </>
//         ) : (
//           <>
//             <PostList posts={currentPosts} isLoading={isLoading} />

//             {/* <PostPagination
//               totalPosts={posts.length}
//               postsPerPage={postsPerPage}
//               currentPage={currentPage}
//               paginate={this.paginate}
//               pageForward={this.pageForward}
//               pageBack={this.pageBack}
//               loading={isLoading}
//             /> */}
//           </>
//         )}
//       </>
//     );
//   }
// }
