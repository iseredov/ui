import React, { memo, ChangeEvent } from 'react';
import noop from 'lodash/noop';
import cn from 'classnames/bind';
import { CheckboxMemo, ICheckboxProps } from './Checkbox';

import style from './CheckboxWithLabel.module.scss';

/** Checkbox с label */
export interface ICheckboxWithLabelProps extends ICheckboxProps {
  /** Внешний стиль контейнера */
  className?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  children: string | JSX.Element;
}

export const CheckboxWithLabel = ({
  onChange = noop,
  className,
  children,
  particle,
  disabled,
  checked,
  name,
  ...props
}: ICheckboxWithLabelProps) => {
  const handleChange = React.useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.persist) {
        e.persist();
      }
      if (!disabled && typeof onChange === 'function') {
        onChange(e);
      }
    },
    [disabled, onChange]
  );

  return (
    <label
      data-test-name={`${name || ''}`}
      data-test-value={checked}
      data-test-type={`${name || ''}Checkbox`}
      className={cn(style.container, className, {
        [style.container_disabled]: disabled,
      })}
    >
      <CheckboxMemo
        {...props}
        classNameBox={style.box}
        disabled={disabled}
        checked={checked}
        name={name}
        onChange={handleChange}
        particle={particle}
      />
      {!!children && (
        <div className={style.label}>
          {typeof children === 'string' && (
            <span className={style.text}>{children}</span>
          )}
          {typeof children !== 'string' && children}
        </div>
      )}
    </label>
  );
};

export const CheckboxWithLabelMemo = memo(CheckboxWithLabel);
