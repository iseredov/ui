import React from 'react';

import { IBaseOptionType } from './types';
import { IBaseRackProps } from './BaseRack';
import { BaseSingleSelect, IBaseSingleSelectProps } from './BaseSingleSelect';
import { BaseRack } from './BaseRack';

import s from './Rack.module.scss';

export interface IRackProps<Option, SelectedOption>
  extends Omit<
    IBaseRackProps<Option, SelectedOption, IBaseSingleSelectProps<Option>>,
    'mobileName' | 'CustomSelect'
  > {}

const CustomSingleSelect = <Option extends IBaseOptionType>({
  isOpen,
  ...props
}: IBaseSingleSelectProps<Option>) =>
  isOpen && (
    <BaseSingleSelect<Option>
      {...props}
      classNames={{
        ...props.classNames,
        select: {
          ...props.classNames?.select,
          innerWrapper: s.selectInnerWrapper,
        },
      }}
      isOpen={isOpen}
    />
  );

export const Rack = <
  Option extends IBaseOptionType,
  SelectedOption extends Partial<Option>
>(
  props: IRackProps<Option, SelectedOption>
) => <BaseRack {...props} CustomSelect={CustomSingleSelect as any} />;
