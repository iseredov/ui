import React, { useState } from 'react';

import { useIsMobileSize } from '../../../shared/useIsMobileSize';
import { IBaseOption } from '../BaseSelect';
import { IMultiSelectProps } from '../MultiSelect';
import { BaseMultiTagSelect } from './BaseMultiTagSelect';

export const MultiTagSelect = <Option extends IBaseOption>({
  isInitialOpen = false,
  ...props
}: IMultiSelectProps<Option>) => {
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
