import React, { memo, ComponentType } from 'react';
import cn from 'classnames/bind';

import { IIconProps } from './types';
import { SelectPlaceholder, SelectText } from './SelectElements';
import { InputMemo } from './Input';

import baseSelectStyles from './BaseSelect.module.scss';
import style from './SingleValue.module.scss';

const cx = cn.bind(style);

interface IProps {
  searchValue: string;
  placeholder: string;
  suggestInputClassName?: string;
  selectTextClassName?: string;
  selectPlaceholderClassName?: string;
  selectedOptionName: string;
  isOpen?: boolean;
  Icon?: ComponentType<IIconProps>;
  onChange: (value: string) => void;
}

const SingleValue = ({
  searchValue,
  placeholder,
  suggestInputClassName,
  selectTextClassName,
  selectPlaceholderClassName,
  selectedOptionName,
  Icon,
  isOpen,
  onChange,
}: IProps) => {
  if (isOpen) {
    return (
      <div className={cx('inputWrapper')} data-name="select-search">
        {Icon && (
          <Icon
            className={cx(
              baseSelectStyles.icon,
              baseSelectStyles.icon_beforeInput
            )}
            size="nm"
          />
        )}
        <InputMemo
          value={searchValue}
          className={suggestInputClassName}
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
    );
  }

  if (selectedOptionName) {
    return (
      <SelectText Icon={Icon} className={selectTextClassName}>
        {selectedOptionName}
      </SelectText>
    );
  }

  return (
    <SelectPlaceholder Icon={Icon} className={selectPlaceholderClassName}>
      {placeholder}
    </SelectPlaceholder>
  );
};

export const SingleValueMemo = memo(SingleValue) as typeof SingleValue;
