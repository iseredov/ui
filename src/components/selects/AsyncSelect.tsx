import React, { useState } from 'react';

import { useIsMobileSize } from '../../shared/useIsMobileSize';
import { BaseAsyncSelect, IBaseAsyncSelectProps } from './BaseAsyncSelect';
import { IBaseOptionType } from './types';

export interface IAsyncSelectProps<Option>
  extends Omit<
    IBaseAsyncSelectProps<Option>,
    | 'mobileBeforeHeader'
    | 'mobileAfterHeader'
    | 'mobileOptionListHeader'
    | 'mobileOptionListFooter'
    | 'isMobile'
    | 'isOpen'
    | 'setOpen'
  > {
  /**
   * Информация по выбранной опции
   */
  selectedOptionData?: Partial<Option>;
  /**
   * Начальное состояние открыт/закрыт выпадающий список
   */
  isInitialOpen?: boolean;
}

export const AsyncSelect = <Option extends IBaseOptionType>({
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
