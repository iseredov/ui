import React from 'react';
import { placements } from '@popperjs/core/lib/enums';
import { withKnobs, select } from '@storybook/addon-knobs';
import { Tooltip, ITooltipProps } from '../src/Tooltip';
import { Grid3x3 } from './helpers/Grid3x3';

export default {
  title: 'Tooltip',
  decorators: [withKnobs],
  parameters: {
    component: Tooltip,
  },
};

export const WithKnobs = (props: Partial<ITooltipProps>) => (
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
      {...props}
    >
      <span>hoverMe</span>
    </Tooltip>
  </Grid3x3>
);
