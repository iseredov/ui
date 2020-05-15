import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, select } from '@storybook/addon-knobs';
import { IconBase } from './IconBase';

export default {
  title: 'Cargomart/IconBase',
  decorators: [withKnobs],
  parameters: {
    component: IconBase,
  },
};

export const WithKnobs = () => (
  <IconBase
    size={select('size', ['xs', 'sm', 'nm', 'lg', 'xl'], 'nm')}
    containerSize={select(
      'containerSize',
      ['xs', 'sm', 'nm', 'lg', 'xl'],
      undefined
    )}
    rotate={select('rotate', [0, 90, 180, 270, 360], 0)}
    onClick={action('onClick')}
  >
    <svg viewBox="0 0 24 24">
      <polygon
        fill="currentColor"
        points="12 14 6 8 4.5 9.5 12 17 19.5 9.5 18 8"
      />
    </svg>
  </IconBase>
);
