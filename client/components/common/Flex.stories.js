import React from 'react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import Flex from './Flex';

export default {
  title: 'Flex',
  decorators: [withKnobs]
};

export const flexWithKnobs = () => (
  <Flex
    justifyCenter={boolean('justifyCenter')}
    justifyAround={boolean('justifyAround')}
    justifyBetween={boolean('justifyBetween')}
    justifyEnd={boolean('justifyEnd')}
  >
    <div
      style={{
        width: '28%',
        height: '100px',
        borderRadius: '10px',
        margin: '10px',
        padding: '10px',
        backgroundColor: '#ccc'
      }}
    >
      Test Div #1
    </div>
    <div
      style={{
        width: '28%',
        height: '100px',
        borderRadius: '10px',
        margin: '10px',
        padding: '10px',
        backgroundColor: '#bbb'
      }}
    >
      Test Div #2
    </div>
    <div
      style={{
        width: '28%',
        height: '100px',
        borderRadius: '10px',
        margin: '10px',
        padding: '10px',
        backgroundColor: '#aaa'
      }}
    >
      Test Div #3
    </div>
  </Flex>
);
