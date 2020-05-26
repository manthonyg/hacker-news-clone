/* eslint-disable react/no-danger */
import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Card from '../common/Card';
import Heading from '../common/Heading';

const StyledLink = styled(Link)`
  text-decoration: underline;
  color: #bb86fc;
  font-weight: 800;
`;

function Comment({ by, id, text, time }) {
  return (
    <Card primary animated>
      <Heading h5>
        by <StyledLink to={id}>{by}</StyledLink> at{' '}
        {moment.unix(time).format('YYYY-MM-DD')}
      </Heading>

      <p dangerouslySetInnerHTML={{ __html: text }} />
    </Card>
  );
}
export default Comment;
