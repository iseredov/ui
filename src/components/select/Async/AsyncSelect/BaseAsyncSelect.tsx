import React, { useCallback, useEffect, useState, SyntheticEvent } from 'react';
import noop from 'lodash/noop';
import get from 'lodash/get';

import {
  BaseSelect,
  IBaseOption,
  areOptionsEqual,
  defaultGetOptionId,
  defaultGetOptionName,
  defaultNoOptionsMessage,
} from '../../BaseSelect';
import { Footer } from '../components/Footer';
import { MobileSelectInput, SelectInput } from '../components/SelectInput';
import { addSelectedToOptions, isScrolledToBottom } from '../helpers';
import { useSearchLoadData } from '../hooks';
import { IBaseAsyncSelectProps } from './types';

export const BaseAsyncSelect = <Option extends IBaseOption>({
  classNames = {},
  loadOptions,
  selectedOptionData,
  isOpen,
  isMobile,
  placeholder = 'Начните вводить',
  onChangeSearchValue = noop,
  alwaysAddSelectedOption = false,
  hasInfinityScroll = false,
  loadingMessage = 'Загружаем...',
  noOptionsMessage = defaultNoOptionsMessage,
  isClearable = false,
  needReload = false,
  setOpen,
  getOptionId = defaultGetOptionId,
  getOptionName = defaultGetOptionName,
  onChange = noop,
  filterOptions,
  customSelectInput,
  IconBeforeSelectInput,
  optionListFooter,
  ...baseSelectProps
}: IBaseAsyncSelectProps<Option>) => {
  const { selectInputClassName, ...otherClassNames } = classNames;

  const [searchValue, setSearchValue] = useState('');

  const changeSelectOpen = useCallback(
    (isOpen: boolean) => {
      if (!isOpen) {
        setSearchValue('');
      }
      setOpen(isOpen);
    },
    [setOpen]
  );

  const changeSearchValue = useCallback(
    (value: string) => {
      onChangeSearchValue(value);
      setSearchValue(value);
    },
    [onChangeSearchValue]
  );

  const handleChange = useCallback(
    ([selectedOption]: Option[]) => {
      setOpen(false);
      setSearchValue('');
      onChange(selectedOption);
    },
    [onChange, setOpen]
  );

  const handleClear = useCallback(() => {
    setSearchValue('');
    onChange();

    if (!isMobile) {
      setOpen(false);
    }
  }, [isMobile, onChange, setOpen]);

  const {
    options,
    isLoading,
    total,
    loadMoreOptions,
    reloadData,
  } = useSearchLoadData({
    loadOptions,
    searchValue,
  });

  useEffect(() => {
    if (needReload) {
      reloadData();
    }
  }, [reloadData, needReload]);

  const handleLoadMoreOptions = useCallback(
    (event: SyntheticEvent<HTMLDivElement>) => {
      if (hasInfinityScroll && isScrolledToBottom(event)) {
        loadMoreOptions();
      }
    },
    [hasInfinityScroll, loadMoreOptions]
  );

  const filteredOptions = filterOptions
    ? options.filter(filterOptions)
    : options;

  const patchedOptions =
    alwaysAddSelectedOption && selectedOptionData && !searchValue
      ? addSelectedToOptions({
          getOptionId,
          getOptionName,
          options: filteredOptions,
          selectedOptionData,
        })
      : filteredOptions;

  const selectedOption = patchedOptions.find(option =>
    areOptionsEqual(getOptionId, option, selectedOptionData as Option)
  );

  const selectedOptionName = getOptionName(selectedOption);

  const selectInput = customSelectInput || (
    <SelectInput
      suggestInputClassName={selectInputClassName}
      selectTextClassName={get(otherClassNames, 'select.selectText')}
      selectPlaceholderClassName={get(
        otherClassNames,
        'select.selectPlaceholder'
      )}
      isOpen={isOpen}
      selectedOptionName={selectedOptionName}
      placeholder={selectedOptionName || placeholder}
      searchValue={searchValue}
      Icon={IconBeforeSelectInput}
      onChange={changeSearchValue}
    />
  );

  const mobileSelectInput = (
    <MobileSelectInput
      placeholder={selectedOptionName || placeholder}
      searchValue={searchValue}
      isLoading={isLoading}
      CustomIcon={IconBeforeSelectInput}
      onChange={changeSearchValue}
    />
  );

  const renderOptionListFooter = (isMobile = false) => (
    <Footer
      optionsLength={options.length}
      total={total}
      loadingMessage={loadingMessage}
      noOptionsMessage={noOptionsMessage}
      isLoading={isLoading}
      isMobile={isMobile}
      hasInfinityScroll={hasInfinityScroll}
    />
  );

  const hasClearIcon =
    isClearable && !!(getOptionName(selectedOption) || searchValue);
  const hasOptions = options.length > 0;
  const hasUnloadedOption = hasOptions && total > options.length;

  return (
    <BaseSelect
      {...baseSelectProps}
      classNames={otherClassNames}
      isOpen={isOpen}
      isMobile={isMobile}
      onSetOpen={changeSelectOpen}
      value={selectedOption}
      options={patchedOptions}
      isLoading={isLoading}
      showLoadingMessage={false}
      noOptionsMessage={isLoading ? '' : noOptionsMessage}
      customSelectInput={selectInput}
      onChange={handleChange}
      onScrollOptionList={handleLoadMoreOptions}
      getOptionId={getOptionId}
      getOptionName={getOptionName}
      onClear={handleClear}
      hasClearIcon={hasClearIcon}
      optionListFooter={
        <>
          {(isLoading || hasUnloadedOption) && renderOptionListFooter(false)}
          {optionListFooter}
        </>
      }
      mobileAfterHeader={mobileSelectInput}
      mobileOptionListFooter={
        (hasUnloadedOption || !hasOptions) && renderOptionListFooter(true)
      }
    />
  );
};
