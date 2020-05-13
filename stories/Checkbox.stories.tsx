import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { Checkbox } from '../src/Checkbox';

export default {
  title: 'Checkbox',
  decorators: [withKnobs],
  parameters: {
    component: Checkbox,
  },
};

// By passing optional props to this story, you can control the props of the component when
// you consume the story in a test.
export const Default = () => (
  <Checkbox
    onChange={action('onChange')}
    checked={boolean('checked', false)}
    disabled={boolean('disabled', false)}
  />
);
