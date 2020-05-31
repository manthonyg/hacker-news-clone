import React from 'react';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import Button from './Button';

export default {
  title: 'Button',
  decorators: [withKnobs]
};

const options = ['light', 'dark'];
const defaultValue = 'light';

export const buttonWithKnobs = () => (
  <Button
    disabled={boolean('disabled')}
    loading={boolean('loading')}
    theme={{ theme: select('Mode', options, defaultValue) }}
  >
    Button
  </Button>
);
