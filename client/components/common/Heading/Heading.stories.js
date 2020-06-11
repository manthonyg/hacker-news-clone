import React from 'react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import Heading from './Heading';

export default {
  title: 'Heading',
  decorators: [withKnobs]
};

export const buttonWithKnobs = () => (
  <Heading
    center={boolean('center')}
    right={boolean('right')}
    noMargin={boolean('no margin')}
  >
    Example Heading!
  </Heading>
);
