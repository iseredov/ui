import React, { memo, useCallback, SyntheticEvent, ChangeEvent } from 'react';
import cn from 'classnames/bind';

import style from './Input.module.scss';

const cx = cn.bind(style);

interface IProps {
  className?: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export const Input = ({ className, placeholder, value, onChange }: IProps) => {
  const handleClick = useCallback((e: SyntheticEvent<HTMLSpanElement>) => {
    e.nativeEvent.stopImmediatePropagation();
    e.stopPropagation();
  }, []);

  const handleChange = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      onChange(value);
    },
    [onChange]
  );

  return (
    <input
      autoFocus
      className={cx('suggestInput', className)}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      onClick={handleClick}
    />
  );
};

export const InputMemo = memo(Input) as typeof Input;
