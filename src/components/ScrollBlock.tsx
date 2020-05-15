import React, { ReactNode, RefObject } from 'react';
import { Scrollbars, ScrollbarProps } from 'react-custom-scrollbars';
import classNames from 'classnames/bind';

import s from './ScrollBlock.module.scss';

const cx = classNames.bind(s);

interface IProps extends ScrollbarProps {
  children: ReactNode;
  className?: string;
  theme?: 'light' | 'dark';
  innerRef: RefObject<Scrollbars>;
}

export const ScrollBlock = ({
  children,
  className,
  theme = 'dark',
  innerRef,
  ...props
}: IProps) => (
  <Scrollbars
    ref={innerRef}
    renderTrackVertical={properties => (
      <div
        {...properties}
        className={cx(className, 'track-vertical', {
          [`theme_${theme}`]: true,
        })}
        style={{ ...properties.style, width: 8 }}
      />
    )}
    {...props}
  >
    {children}
  </Scrollbars>
);
