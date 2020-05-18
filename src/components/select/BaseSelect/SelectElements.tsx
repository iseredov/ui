import React from 'react';
import cn from 'classnames/bind';

import { IIconProps } from './types';

import s from './BaseSelect.module.scss';

interface TSelectTextProps {
  className?: string;
  isDisabled?: boolean;
  Icon?: (props: IIconProps) => JSX.Element;
  children?: string;
}

const cx = cn.bind(s);

export const SelectText = ({
  className,
  isDisabled = false,
  Icon,
  children = '',
}: TSelectTextProps) => (
  <>
    {Icon && <Icon className={cx('icon', 'icon_beforeInput')} size="nm" />}
    <p
      className={cx(
        'selectText',
        { selectText_icon: Boolean(Icon) },
        { selectText_disabled: isDisabled },
        className
      )}
    >
      {children}
    </p>
  </>
);

interface TSelectPlaceholderProps {
  className?: string;
  Icon?: (props: IIconProps) => JSX.Element;
  children: string;
}

export const SelectPlaceholder = ({
  className,
  Icon,
  children,
}: TSelectPlaceholderProps) => (
  <>
    {Icon && <Icon className={cx('icon', 'icon_beforeInput')} size="nm" />}
    <div
      className={cx(
        'selectText',
        { selectText_icon: Boolean(Icon) },
        'selectText_placeholder',
        className
      )}
    >
      {children}
    </div>
  </>
);
