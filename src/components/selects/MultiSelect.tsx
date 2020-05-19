import React, { useState } from 'react';

import { useIsMobileSize } from '../../shared/useIsMobileSize';
import { BaseMultiSelect, IBaseMultiSelectProps } from './BaseMultiSelect';
import { IBaseOptionType } from './types';

export interface IMultiSelectProps<Option>
  extends Omit<
    IBaseMultiSelectProps<Option>,
    | 'isOpen'
    | 'isMobile'
    | 'onSetOpen'
    | 'mobileBeforeHeader'
    | 'mobileAfterHeader'
    | 'mobileOptionListHeader'
    | 'mobileOptionListFooter'
  > {}

export const MultiSelect = <Option extends IBaseOptionType>({
  isInitialOpen = false,
  ...props
}: IMultiSelectProps<Option>) => {
  const [isOpen, setOpen] = useState(isInitialOpen);
  const isMobile = useIsMobileSize();

  return (
    <BaseMultiSelect
      {...props}
      isOpen={isOpen}
      isMobile={isMobile}
      onSetOpen={setOpen}
    />
  );
};
