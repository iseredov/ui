import React, { memo, ReactNode } from 'react';
import cn from 'classnames/bind';

// @ts-ignore
import s from './Grid3x3.module.scss';

type TProps = {
  maxWidth?: boolean;
  children: ReactNode;
};

const positions = [
  'topLeft',
  'topRight',
  'top',
  'left',
  'center',
  'right',
  'bottom',
  'bottomLeft',
  'bottomRight',
];

export const Grid3x3 = memo<TProps>(function Grid3x3({ children, maxWidth }) {
  return (
    <div className={s.container}>
      {positions.map(position => (
        <div className={cn(maxWidth && s.maxWidth, s[position])} key={position}>
          {children}
        </div>
      ))}
    </div>
  );
});

export const Grid3x3Center = memo<TProps>(function Grid3x3Center({ children }) {
  return (
    <div className={s.container}>
      <div className={s.center}>{children}</div>
    </div>
  );
});
