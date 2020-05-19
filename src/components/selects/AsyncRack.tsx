import React, { useMemo } from 'react';
import cn from 'classnames/bind';

import { IconSearch } from '../icons/IconSearch';

import { BaseAsyncSelect } from './BaseAsyncSelect';
import { IBaseAsyncSelectProps } from './BaseAsyncSelect';
import { IBaseOptionType } from './types';
import { IBaseRackProps } from './BaseRack';
import { BaseRack } from './BaseRack';

import style from './AsyncRack.module.scss';

const cx = cn.bind(style);

export interface IAsyncRackProps<Option, SelectedOption>
  extends Omit<
    IBaseRackProps<Option, SelectedOption, IBaseAsyncSelectProps<Option>>,
    'mobileName' | 'CustomSelect'
  > {}

const CustomAsyncSelect = <Option extends IBaseOptionType>({
  isOpen,
  classNames,
  ...props
}: IBaseAsyncSelectProps<Option>) => {
  const customClassNames = useMemo(
    () => ({
      ...classNames,
      select: {
        wrapper: cx({ selectWrapperNone: !isOpen }),
        innerWrapper: cx('selectInnerWrapper'),
        selectInputWrapper: cx('selectInputWrapper'),
      },
      selectInputClassName: cx('selectInput'),
    }),
    [classNames, isOpen]
  );

  return (
    <BaseAsyncSelect
      {...props}
      classNames={customClassNames}
      isOpen={isOpen}
      IconBeforeSelectInput={() => (
        <IconSearch className={cx('inputIconSearch')} />
      )}
      hasInfinityScroll={false}
    />
  );
};

export const AsyncRack = <
  Option extends IBaseOptionType,
  SelectedOption extends Partial<Option>
>(
  props: IAsyncRackProps<Option, SelectedOption>
) => <BaseRack {...props} CustomSelect={CustomAsyncSelect as any} />;
