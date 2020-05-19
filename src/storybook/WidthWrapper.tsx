import React from 'react';

interface IProps {
  children: JSX.Element;
  width?: number;
}

export const WidthWrapper = ({ children, width = 400 }: IProps) => (
  <div style={{ width }}>{children}</div>
);
