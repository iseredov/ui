import React, { memo } from 'react';
import cn from 'classnames/bind';

import { IIconProps } from '../BaseSelect/types';
import { SelectPlaceholder, SelectText } from '../BaseSelect/SelectElements';
import { Input } from './Input';

import baseSelectStyles from '../../BaseSelect/BaseSelect.module.scss';
import style from './SelectInput.module.scss';

const cx = cn.bind(style);

interface IProps {
  searchValue: string;
  placeholder: string;
  suggestInputClassName?: string;
  selectTextClassName?: string;
  selectPlaceholderClassName?: string;
  selectedOptionName: string;
  isOpen?: boolean;
  Icon?: (props: IIconProps) => JSX.Element;
  onChange: (value: string) => void;
}

const BaseSelectInput = ({
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
        <Input
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

export const SelectInput = memo(BaseSelectInput) as typeof BaseSelectInput;
