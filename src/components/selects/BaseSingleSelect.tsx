import React, { useCallback } from 'react';

import { BaseSelect } from './BaseSelect';
import { IBaseOptionType, IGeneralSelectProps } from './types';

export interface IBaseSingleSelectProps<Option>
  extends Omit<
    IGeneralSelectProps<Option>,
    'value' | 'onChange' | 'hasClearIcon' | 'onClear'
  > {
  /**
   * Выбранная опция
   */
  value?: Option;
  /**
   * Наличие возможности удалить выбранное значение
   */
  isClearable?: boolean;
  /**
   * Коллбек, выполняемый при выборе опции
   */
  onChange: (o?: Option) => void;
  /**
   * Начальное состояние (открыт/закрыт) выпадающий список
   */
  isOpen: boolean;
  /**
   * Флаг мобильного разрешения
   */
  isMobile?: boolean;
  /**
   * Сеттер "isOpen"
   */
  setOpen: (isOpen: boolean) => void;
  /**
   * Предикат для фильтрации загруженных опций
   */
  filterOptions?: (option: Option) => boolean;
}

export const BaseSingleSelect = <Option extends IBaseOptionType>({
  options,
  isOpen,
  isClearable = false,
  hasDropDownIcon = true,
  setOpen,
  onChange,
  filterOptions,
  ...baseSelectProps
}: IBaseSingleSelectProps<Option>) => {
  const changeSelectedValue = useCallback(
    ([selectedOption]: Option[]) => {
      onChange(selectedOption);
      setOpen(false);
    },
    [onChange, setOpen]
  );

  const handleClear = useCallback(() => {
    onChange(undefined);
  }, [onChange]);

  const filteredOptions = filterOptions
    ? options.filter(filterOptions)
    : options;

  return (
    <BaseSelect
      {...baseSelectProps}
      options={filteredOptions}
      isOpen={isOpen}
      onSetOpen={setOpen}
      onChange={changeSelectedValue}
      onClear={handleClear}
      hasClearIcon={isClearable}
      hasDropDownIcon={hasDropDownIcon}
    />
  );
};
