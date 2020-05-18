import React, { useState } from 'react';

import { useIsMobileSize } from '../../../../shared/useIsMobileSize';
import { IBaseOption } from '../../BaseSelect/Options/types';
import { BaseAsyncSelect } from './BaseAsyncSelect';
import { IAsyncSelectProps } from './types';

export const AsyncSelect = <Option extends IBaseOption>({
  isInitialOpen = false,
  ...props
}: IAsyncSelectProps<Option>) => {
  const [isOpen, setOpen] = useState(isInitialOpen);
  const isMobile = useIsMobileSize();

  return (
    <BaseAsyncSelect
      {...props}
      isOpen={isOpen}
      isMobile={isMobile}
      setOpen={setOpen}
    />
  );
};
