import React, { FC, HTMLAttributes, ReactChild } from 'react';
import s from './Button.module.css';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  children?: ReactChild;
}

export const Button: FC<Props> = ({ children }) => {
  return (
    <div className={s.button}>
      {children || `the snozzberries taste like snozzberries`}
    </div>
  );
};
