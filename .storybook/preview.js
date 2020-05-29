import { configure } from '@storybook/react';

configure(require.context('../client/components/common', true, /\.stories\.js$/), module);
