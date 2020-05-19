import React, { useState } from 'react';

import { useIsMobileSize } from '../../shared/useIsMobileSize';
import { BaseMultiTagSelect } from './BaseMultiTagSelect';
import { IBaseOptionType } from './types';
import { IBaseMultiSelectProps } from './BaseMultiSelect';

export interface IMultiTagSelectProps<Option>
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

export const MultiTagSelect = <Option extends IBaseOptionType>({
  isInitialOpen = false,
  ...props
}: IMultiTagSelectProps<Option>) => {
  const [isOpen, setOpen] = useState(isInitialOpen);
  const isMobile = useIsMobileSize();

  return (
    <BaseMultiTagSelect
      {...props}
      isOpen={isOpen}
      isMobile={isMobile}
      onSetOpen={setOpen}
    />
  );
};
