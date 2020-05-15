import React, { useState } from 'react';

import { IBaseOption } from '../BaseSelect';
import { BaseSingleSelect } from './BaseSingleSelect';
import { ISelectProps } from './types';

export const Select = <Option extends IBaseOption>({
  isInitialOpen = false,
  ...props
}: ISelectProps<Option>) => {
  const [isOpen, setOpen] = useState(isInitialOpen);

  return (
    <BaseSingleSelect
      {...props}
      isOpen={isOpen}
      isMobile={false}
      setOpen={setOpen}
    />
  );
};
