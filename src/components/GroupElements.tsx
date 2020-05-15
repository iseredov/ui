import React, { Children, isValidElement, ReactNode, memo } from 'react';
import { getGroupPosition } from '../shared/helpers';
import { TGroupPosition } from '../shared/types';

import s from './GroupElements.module.scss';

export interface IGroupElementsProps {
  groupPositionH?: TGroupPosition;
  groupPositionV?: TGroupPosition;
  type?: 'vertical' | 'horizontal';
  children?: ReactNode;
}

export const GroupElements = ({
  groupPositionH,
  groupPositionV,
  type = 'horizontal',
  children,
}: IGroupElementsProps) => {
  const items: JSX.Element[] = [];

  Children.forEach(children, item => {
    if (isValidElement(item)) {
      items.push(item);
    }
  });

  return (
    <div className={type === 'horizontal' ? s.horizontal : s.vertical}>
      {items.map((item, index) => (
        <item.type
          {...item.props}
          key={index}
          groupPositionH={
            type === 'horizontal'
              ? getGroupPosition(index, items.length)
              : groupPositionH
          }
          groupPositionV={
            type === 'vertical'
              ? getGroupPosition(index, items.length)
              : groupPositionV
          }
        />
      ))}
    </div>
  );
};

export const GroupElementsMemo = memo(GroupElements);
