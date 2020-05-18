import React, { useState } from 'react';

import { useIsMobileSize } from '../../../shared/useIsMobileSize';
import { IBaseOption } from '../Options/types';
import { BaseSingleSelect } from './BaseSingleSelect';
import { ISelectProps } from './types';

export const Select = <Option extends IBaseOption>({
  isInitialOpen = false,
  ...props
}: ISelectProps<Option>) => {
  const [isOpen, setOpen] = useState(isInitialOpen);
  const isMobile = useIsMobileSize();

  return (
    <BaseSingleSelect
      {...props}
      isOpen={isOpen}
      isMobile={isMobile}
      setOpen={setOpen}
    />
  );
};
