import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import { CheckboxWithLabel } from './CheckboxWithLabel';

export default {
  title: 'Cargomart/checkboxes/CheckboxWithLabel',
  decorators: [withKnobs],
  parameters: {
    component: CheckboxWithLabel,
  },
};

export const Default = () => (
  <CheckboxWithLabel checked>текст</CheckboxWithLabel>
);

export const WithKnobs = () => (
  <CheckboxWithLabel
    onChange={action('onChange')}
    checked={boolean('checked', true)}
    particle={boolean('particle', false)}
    disabled={boolean('disabled', false)}
  >
    {text('children', 'текст')}
  </CheckboxWithLabel>
);
