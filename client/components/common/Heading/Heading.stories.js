import React from 'react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import Heading from './Heading';

export default {
  title: 'Heading',
  decorators: [withKnobs]
};

// const options = ['h2', 'h3', 'h4', 'h5'];
// const defaultValue = 'h2';

export const buttonWithKnobs = () => (
  <Heading
    disabled={boolean('disabled')}
    center={boolean('center')}
    right={boolean('right')}
    noMargin={boolean('margin')}
  >
    Heading
  </Heading>
);
