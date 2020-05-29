import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs';
import Card from './Card';

export default {
  title: 'Card',
  decorators: [withKnobs]
};

const options = ['light', 'dark'];
const defaultValue = 'light';

export const Text = () => (
  <Card primary theme={{ theme: select('Mode', options, defaultValue) }}>
    Card Text
  </Card>
);
