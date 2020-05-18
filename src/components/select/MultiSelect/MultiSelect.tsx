import React, { useState } from 'react';

import { useIsMobileSize } from '../../../shared/useIsMobileSize';
import { IBaseOption } from '../BaseSelect';
import { BaseMultiSelect } from './BaseMultiSelect';
import { IMultiSelectProps } from './types';

export const MultiSelect = <Option extends IBaseOption>({
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
