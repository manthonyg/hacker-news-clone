import React from 'react';
import Card from './common/Card';
import Heading from './common/Heading';

function Comment({ by, id, text, time }) {
  return (
    <Card primary animated>
      <Heading h4>
        {by} with an id of {id} at {time}
      </Heading>

      <p dangerouslySetInnerHTML={{ __html: text }} />
    </Card>
  );
}
export default Comment;
