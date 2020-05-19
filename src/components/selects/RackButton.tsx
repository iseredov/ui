import React, { useCallback, useMemo } from 'react';
import cn from 'classnames/bind';

import { IconSearch } from '../icons/IconSearch';

import s from './RackButton.module.scss';

const cx = cn.bind(s);

interface IProps {
  dataName?: string;
  isMulti?: boolean;
  isDisabled?: boolean;
  hasSelectedOptions?: boolean;
  getButtonName?: (options: {
    isMulti: boolean;
    hasSelectedOptions: boolean;
  }) => string;
  onClick: () => void;
}

export const RackButton = ({
  dataName,
  isMulti = false,
  isDisabled = false,
  hasSelectedOptions = false,
  getButtonName,
  onClick,
}: IProps) => {
  const buttonName = useMemo(() => {
    if (getButtonName) {
      return getButtonName({ isMulti, hasSelectedOptions });
    }

    if (isMulti) {
      return 'Добавить';
    }

    return hasSelectedOptions ? 'Заменить' : 'Добавить';
  }, [getButtonName, isMulti, hasSelectedOptions]);

  const handleClick = useCallback(() => {
    if (!isDisabled) {
      onClick();
    }
  }, [isDisabled, onClick]);

  return (
    <button
      data-name={dataName ? `${dataName}_button` : undefined}
      className={cx('button', { button_disabled: isDisabled })}
      onClick={handleClick}
    >
      <IconSearch
        className={cx('iconSearch', { iconSearch_disabled: isDisabled })}
      />
      <h2 className={cx('buttonName', { buttonName_disabled: isDisabled })}>
        {buttonName}
      </h2>
    </button>
  );
};
