import React, { useState } from 'react';

import { useIsMobileSize } from '../../shared/useIsMobileSize';
import { BaseSingleSelect, IBaseSingleSelectProps } from './BaseSingleSelect';
import { IBaseOptionType } from './types';

export interface ISingleSelectProps<Option>
  extends Omit<
    IBaseSingleSelectProps<Option>,
    'isOpen' | 'setOpen' | 'isMobile'
  > {
  /**
   * Начальное состояние (открыт/закрыт) выпадающий список
   */
  isInitialOpen?: boolean;
}

export const SingleSelect = <Option extends IBaseOptionType>({
  isInitialOpen = false,
  ...props
}: ISingleSelectProps<Option>) => {
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
