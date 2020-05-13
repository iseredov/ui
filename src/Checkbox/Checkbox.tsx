import React, { memo, FocusEvent, ChangeEvent } from 'react';
import classNames from 'classnames/bind';

import style from './Checkbox.module.scss';

const cx = classNames.bind(style);

export interface ICheckboxProps {
  name?: string;
  checked?: boolean;
  particle?: boolean;
  autoFocus?: boolean;
  disabled?: boolean;
  value?: string | string[] | number;
  tabIndex?: number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
}

export const Checkbox = ({
  name,
  checked,
  particle,
  onChange,
  ...rest
}: ICheckboxProps) => (
  <>
    <input
      {...rest}
      checked={checked}
      name={name}
      className={cx('input', {
        input_active: checked,
      })}
      type="checkbox"
      onChange={onChange}
    />
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      className={cx(style.checkmark)}
    >
      <rect
        className={cx(style.shadow)}
        width="19"
        height="19"
        rx="4"
        x="3"
        y="3"
      />
      <rect
        className={cx(style.box)}
        width="14"
        height="14"
        x="5.5"
        y="5.5"
        rx="2"
      />
      {particle && (
        <rect
          className={cx(style.check)}
          width="8"
          height="2"
          x="8.5"
          y="11.5"
          rx="1"
        />
      )}
      {!particle && (
        <path
          className={cx(style.check)}
          d="M11.032 13.885l-1.78-1.899a.879.879 0 0 0-1.3 0 1.03 1.03 0 0 0 0 1.39l2.22 2.369c.233.25.6.255.828.255.229 0 .658-.005.892-.255L16.5 10.89a1.032 1.032 0 0 0 0-1.39.88.88 0 0 0-1.301 0l-4.167 4.385z"
        />
      )}
    </svg>
  </>
);

export const CheckboxMemo = memo(Checkbox);
