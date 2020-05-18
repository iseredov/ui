import React, { useCallback, SyntheticEvent } from 'react';
import classNames from 'classnames/bind';
import noop from 'lodash/noop';

import { Tooltip } from '../../Tooltip';
import { IconError } from '../../../components/icons/IconError';
import { IconArrow } from '../../../components/icons/IconArrow';
import { IconClear } from '../../../components/icons/IconClear';
import { IconSpinner } from '../../../components/icons/IconSpinner';

import { hasTextInError } from './helpers/hasTextInError';

import style from './BaseSelect.module.scss';

const cx = classNames.bind(style);

interface TSelectIconsProps {
  error?: string | boolean;
  isOpen?: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
  hasClearIcon?: boolean;
  hasDropDownIcon?: boolean;
  onClear?: (event: SyntheticEvent<SVGSVGElement>) => void;
}

export const SelectIcons = ({
  error = false,
  isOpen = false,
  isLoading = false,
  isDisabled = false,
  hasClearIcon = false,
  hasDropDownIcon = false,
  onClear = noop,
}: TSelectIconsProps) => {
  const handleClear = useCallback(
    (event: SyntheticEvent<SVGSVGElement>) => {
      event.stopPropagation();

      if (!isDisabled) {
        onClear(event);
      }
    },
    [isDisabled, onClear]
  );

  if (isLoading) {
    return <IconSpinner className={cx('spinner')} size="xs" />;
  }

  return (
    <>
      {hasTextInError(error) && (
        <Tooltip content={error}>
          <IconError className={cx('icon_error')} />
        </Tooltip>
      )}
      {hasClearIcon && (
        <IconClear
          className={cx('icon', { icon_disabled: isDisabled })}
          onClick={handleClear as any}
        />
      )}
      {hasDropDownIcon && (
        <IconArrow
          size="xs"
          className={cx(
            'icon',
            'icon-arrow',
            { 'icon-arrow_up': isOpen },
            { icon_disabled: isDisabled }
          )}
        />
      )}
    </>
  );
};
