import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs';
import Loader from './Loader';

export default {
  title: 'Loader',
  decorators: [withKnobs]
};

const options = ['light', 'dark'];
const defaultValue = 'light';

export const buttonWithKnobs = () => (
  <Loader theme={{ theme: select('Mode', options, defaultValue) }} />
);
