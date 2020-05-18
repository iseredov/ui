import React, { memo, useCallback, ChangeEvent } from 'react';
import cn from 'classnames/bind';

import { IconClear } from '../../icons/IconClear';
import { IconSpinner } from '../../icons/IconSpinner';
import { IIconProps } from '../BaseSelect/types';

import style from './SelectInput.module.scss';

const cx = cn.bind(style);

interface IProps {
  searchValue: string;
  placeholder: string;
  isLoading?: boolean;
  CustomIcon?: (props: IIconProps) => JSX.Element;
  onChange: (value: string) => void;
}

const BaseMobileSelectInput = ({
  searchValue,
  placeholder,
  isLoading = false,
  CustomIcon,
  onChange,
}: IProps) => {
  const handleChange = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      onChange(value);
    },
    [onChange]
  );

  const handleClear = useCallback(() => {
    onChange('');
  }, [onChange]);

  const renderIconAfterInput = () => {
    if (isLoading) {
      return <IconSpinner className={cx('icon', 'icon_right')} size="sm" />;
    }

    if (searchValue) {
      return (
        <IconClear
          className={cx('icon', 'icon_right', 'icon_clear')}
          onClick={handleClear}
        />
      );
    }

    return null;
  };

  return (
    <div className={cx('inputWrapper', 'inputWrapper_mobile')}>
      {CustomIcon && <CustomIcon className={cx('icon')} size="lg" />}
      <input
        autoFocus
        className={cx('input', { input_hasIcon: CustomIcon })}
        value={searchValue}
        placeholder={placeholder}
        onChange={handleChange}
      />
      {renderIconAfterInput()}
    </div>
  );
};

export const MobileSelectInput = memo(
  BaseMobileSelectInput
) as typeof BaseMobileSelectInput;
