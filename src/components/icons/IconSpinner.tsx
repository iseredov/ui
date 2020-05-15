import React from 'react';
import classNames from 'classnames/bind';

import { IconBase, IIconProps } from '../IconBase';

import style from './IconSpinner.module.scss';

const cx = classNames.bind(style);

export interface TIconSpinnerProps extends IIconProps {
  /** Цвет спиннера */
  color?: 'blue' | 'white';
  /** Толщина крутящейся линии */
  strokeWidth?: number;
}

export const IconSpinner = ({
  strokeWidth = 4,
  color = 'blue',
  ...props
}: TIconSpinnerProps) => (
  <IconBase {...props}>
    <svg className={cx('circular')} viewBox="25 25 50 50">
      <circle
        className={cx('path', `path_color_${color}`)}
        cx="50"
        cy="50"
        r="20"
        fill="none"
        strokeWidth={strokeWidth}
        strokeMiterlimit={10}
      />
    </svg>
  </IconBase>
);
