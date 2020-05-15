import React from 'react';
import { IconBase, IIconProps } from '../IconBase';

export const IconClear = (props: IIconProps) => (
  <IconBase {...props}>
    <svg viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M7.922 7L7 7.922 11.079 12 7 16.079l.92.921 4.07-4.088L16.08 17l.921-.922-4.09-4.09 4.049-4.068-.88-.92-4.078 4.079z"
      />
    </svg>
  </IconBase>
);
