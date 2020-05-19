import React, { SyntheticEvent, useCallback } from 'react';
import noop from 'lodash/noop';

import { BaseSelect } from './BaseSelect';
import {
  defaultGetOptionId,
  defaultGetOptionName,
  defaultNoOptionsMessage,
} from './helpers/defaultValues';
import { SelectPlaceholder, SelectText } from './SelectElements';
import { OptionMultiMemo } from './OptionMulti';
import { IBaseOptionType, IGeneralSelectProps } from './types';

export interface IBaseMultiSelectProps<Option>
  extends Omit<
    IGeneralSelectProps<Option>,
    'value' | 'hasClearIcon' | 'onClear'
  > {
  isOpen: boolean;
  isMobile?: boolean;
  /**
   * Массив выбранных опций
   */
  selectedOptions: Option[];
  /**
   * Наличие возможности сбросить выбранные опции
   */
  isClearable?: boolean;
  /**
   * Начальное состояние (открыт/закрыт) выпадающий список
   */
  isInitialOpen?: boolean;

  onSetOpen: (isOpen: boolean) => void;
}

export const BaseMultiSelect = <Option extends IBaseOptionType>({
  mobileName,
  tabIndex = 0,
  dataName,
  classNames = {},
  maxOptionListWidth,
  options,
  selectedOptions = [],
  isMobile,
  isOpen,
  placeholder = '',
  error = false,
  isClearable = false,
  isLoading = false,
  isDisabled = false,
  hasDropDownIcon = true,
  noOptionsMessage = defaultNoOptionsMessage,
  position,
  size = 'nm',
  onSetOpen,
  onChange,
  onFocus = noop,
  onBlur = noop,
  customSelectInput,
  optionListHeader,
  optionListFooter,
  CustomOptionComponent,
  mobileAfterHeader,
  mobileBeforeHeader,
  mobileOptionListFooter,
  mobileOptionListHeader,
  getOptionId = defaultGetOptionId,
  getOptionName = defaultGetOptionName,
}: IBaseMultiSelectProps<Option>) => {
  const clearOptions = useCallback(
    (event: SyntheticEvent<Element>) => {
      event.stopPropagation();
      onChange([]);
    },
    [onChange]
  );

  const getMultiSelectText = useCallback(
    (selectedOptions: Option[]) => {
      switch (selectedOptions.length) {
        case 0:
          return '';
        case 1:
          return getOptionName(selectedOptions[0]);
        default:
          return `Выбрано (${selectedOptions.length})`;
      }
    },
    [getOptionName]
  );

  const renderSelectInput = useCallback(() => {
    const selectText = getMultiSelectText(selectedOptions);

    return selectText ? (
      <SelectText isDisabled={isDisabled}>{selectText}</SelectText>
    ) : (
      <SelectPlaceholder>{placeholder}</SelectPlaceholder>
    );
  }, [selectedOptions, isDisabled, placeholder, getMultiSelectText]);

  return (
    <BaseSelect
      tabIndex={tabIndex}
      mobileName={mobileName}
      dataName={dataName}
      classNames={classNames}
      maxOptionListWidth={maxOptionListWidth}
      isMobile={isMobile}
      isOpen={isOpen}
      isLoading={isLoading}
      isDisabled={isDisabled}
      value={selectedOptions}
      options={options}
      placeholder={placeholder}
      error={error}
      noOptionsMessage={noOptionsMessage}
      position={position}
      size={size}
      customSelectInput={customSelectInput || renderSelectInput()}
      optionListHeader={optionListHeader}
      optionListFooter={optionListFooter}
      CustomOptionComponent={CustomOptionComponent || OptionMultiMemo}
      mobileAfterHeader={mobileAfterHeader}
      mobileBeforeHeader={mobileBeforeHeader}
      mobileOptionListFooter={mobileOptionListFooter}
      mobileOptionListHeader={mobileOptionListHeader}
      onSetOpen={onSetOpen}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      getOptionId={getOptionId}
      getOptionName={getOptionName}
      onClear={clearOptions}
      hasClearIcon={isClearable}
      hasDropDownIcon={hasDropDownIcon}
    />
  );
};
