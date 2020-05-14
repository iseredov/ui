import React from 'react';
import { placements } from '@popperjs/core/lib/enums';
import { withKnobs, select } from '@storybook/addon-knobs';
import { Tooltip } from './Tooltip';
import { Grid3x3 } from '../storybook/Grid3x3';

export default {
  title: 'Tooltip',
  decorators: [withKnobs],
  parameters: {
    component: Tooltip,
  },
};

export const Default = () => (
  <Tooltip content="tooltip">
    <span>hoverMe</span>
  </Tooltip>
);

export const WithKnobs = () => (
  <Grid3x3>
    <Tooltip
      content="tooltip"
      placement={select(
        'placement',
        placements.reduce(
          (acc, item) => ({ ...acc, [item.toString()]: item }),
          {}
        ),
        'right'
      )}
    >
      <span>hoverMe</span>
    </Tooltip>
  </Grid3x3>
);
