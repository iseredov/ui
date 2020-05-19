import React from 'react';

import { IBaseOption } from '../Options/types';
import { IBaseRackProps } from './types';
import { IBaseSelectProps } from '../SingleSelect/types';
import { BaseSingleSelect } from '../SingleSelect/BaseSingleSelect';
import { BaseRack } from './BaseRack';

import s from './Rack.module.scss';

export interface IRackProps<Option, SelectedOption>
  extends Omit<
    IBaseRackProps<Option, SelectedOption, IBaseSelectProps<Option>>,
    'mobileName' | 'CustomSelect'
  > {}

const CustomSingleSelect = <Option extends IBaseOption>({
  isOpen,
  ...props
}: IBaseSelectProps<Option>) =>
  isOpen && (
    <BaseSingleSelect
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
  Option extends IBaseOption,
  SelectedOption extends Partial<Option>
>(
  props: IRackProps<Option, SelectedOption>
) => <BaseRack {...props} CustomSelect={CustomSingleSelect as any} />;
