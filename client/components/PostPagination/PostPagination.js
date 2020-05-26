/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-plusplus */
import React from 'react';
import Button from '../common/Button';
import Flex from '../common/Flex';

class PostPagination extends React.Component {
  render() {
    const pageNumbers = [];
    const {
      totalPosts,
      postsPerPage,
      currentPage,
      paginate,
      pageBack,
      pageForward
    } = this.props;

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      pageNumbers.push(i);
    }
    return (
      <Flex justifyCenter>
        <Button onClick={() => pageBack(currentPage)}>&laquo;</Button>
        {pageNumbers &&
          pageNumbers.map(pageNumber => (
            <Button
              onClick={() => paginate(pageNumber)}
              disabled={currentPage === pageNumber}
              label={pageNumber}
            >
              {pageNumber}
            </Button>
          ))}
        <Button onClick={() => pageForward(currentPage)}>&raquo;</Button>
      </Flex>
    );
  }
}

export default PostPagination;
