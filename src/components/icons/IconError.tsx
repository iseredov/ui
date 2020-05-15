import React from 'react';
import { IconBase, IIconProps } from '../IconBase';

export const IconError = (props: IIconProps) => (
  <IconBase {...props}>
    <svg viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M12 19a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-3c.442 0 1-.448 1-1s-.558-1-1-1c-.442 0-1 .448-1 1s.558 1 1 1zm0-2.5c.731 0 1-3.5 1-4S13 8 12 8s-1 1-1 1.5.269 4 1 4z"
      />
    </svg>
  </IconBase>
);
