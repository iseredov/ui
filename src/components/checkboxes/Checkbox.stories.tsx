import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { Checkbox } from './Checkbox';

export default {
  title: 'Cargomart/checkboxes/Checkbox',
  decorators: [withKnobs],
  parameters: {
    component: Checkbox,
  },
};

export const Default = () => <Checkbox checked />;

export const WithKnobs = () => (
  <Checkbox
    onChange={action('onChange')}
    checked={boolean('checked', true)}
    particle={boolean('particle', false)}
    disabled={boolean('disabled', false)}
  />
);
