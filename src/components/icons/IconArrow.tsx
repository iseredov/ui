import React from 'react';
import { IconBase, IIconProps } from '../IconBase';

export const IconArrow = (props: IIconProps) => (
  <IconBase {...props}>
    <svg viewBox="0 0 24 24">
      <polygon
        fill="currentColor"
        points="12 14 6 8 4.5 9.5 12 17 19.5 9.5 18 8"
      />
    </svg>
  </IconBase>
);
