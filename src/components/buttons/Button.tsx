import React, {
  SyntheticEvent,
  useCallback,
  ReactNode,
  Ref,
  memo,
} from 'react';
import noop from 'lodash/noop';
import classNames from 'classnames/bind';
import { getClassnameModifiers } from '../../shared/helpers';
import { TGroupPosition } from '../../shared/types';

import s from './Button.module.scss';

const cx = classNames.bind(s);

export interface IButtonProps {
  id?: string;
  type?: 'button' | 'submit';
  title?: string;
  rel?: string;
  onClick?: (event: SyntheticEvent<HTMLButtonElement>) => void;
  tabIndex?: number;
  'data-test'?: string;
  additional?: ReactNode;
  innerRef?: Ref<any>;

  children?: ReactNode;
  className?: string;
  appearance?:
    | 'primary'
    | 'secondary'
    | 'info'
    | 'success'
    | 'transparent'
    | 'danger';

  size?: 'xs' | 'sm' | 'nm' | 'lg' | 'xl';
  groupPositionH?: TGroupPosition;
  groupPositionV?: TGroupPosition;
  contentPosition?: 'start' | 'center' | 'end';
  block?: boolean;
  wide?: boolean;
  active?: boolean;
  hover?: boolean;
  focus?: boolean;
  disabled?: boolean;
  loading?: boolean;
  prefix?: JSX.Element;
  postfix?: JSX.Element;
  ellipsis?: boolean;
}

export const Button = ({
  id,
  type = 'button',
  loading = false,
  disabled = false,
  additional,
  onClick = noop,
  children,
  className,
  size = 'nm',
  appearance = 'secondary',
  groupPositionH,
  groupPositionV,
  contentPosition = 'center',
  active,
  wide,
  block,
  focus,
  hover,
  ellipsis,
  prefix,
  postfix,
}: IButtonProps) => {
  const handleClick = useCallback(
    (event: SyntheticEvent<HTMLButtonElement>) => {
      if (!disabled && !loading) {
        onClick(event);
      }
    },
    [disabled, loading, onClick]
  );

  const solid = ['primary', 'success', 'danger'].includes(appearance);

  const containerClassName = cx(
    className,
    getClassnameModifiers('Button', {
      block,
      wide,
      [`appearance_${appearance}`]: appearance,
      [`size_${size}`]: size,
      [`content-position_${contentPosition}`]: contentPosition,
      [`group-position-h_${groupPositionH || ''}`]: groupPositionH,
      [`group-position-v_${groupPositionV || ''}`]: groupPositionV,
      prefix,
      postfix,
      loading,
      active,
      hover,
      focus,
      disabled,
      onlyIcon: !children && ((postfix && !prefix) || (prefix && !postfix)),
      solid,
    })
  );

  return (
    <button
      id={id}
      className={containerClassName}
      onClick={handleClick}
      type={type}
    >
      {!!prefix && <prefix.type className={s.icon_left} {...prefix.props} />}
      {!!children && (
        <span className={cx('text', { ellipsis })}>{children}</span>
      )}
      {!!postfix && <postfix.type className={s.icon_left} {...postfix.props} />}
      {additional}
    </button>
  );
};

export const ButtonMemo = memo(Button);
