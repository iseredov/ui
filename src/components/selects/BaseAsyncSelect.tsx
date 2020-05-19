import React, { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import noop from 'lodash/noop';
import get from 'lodash/get';

import { BaseSelect } from './BaseSelect';
import { areOptionsEqual } from './helpers/areOptionsEqual';

import {
  defaultGetOptionId,
  defaultGetOptionName,
  defaultNoOptionsMessage,
} from './helpers/defaultValues';
import { Footer } from './Footer';
import { MobileSelectInputMemo } from './MobileSelectInput';
import { SingleValueMemo } from './SingleValue';
import { addSelectedToOptions } from './helpers/addSelectedToOptions';
import {
  ILoadOptionParams,
  ILoadOptionsData,
  useSearchLoadData,
} from './hooks/useSearchLoadData';
import {
  IBaseOptionType,
  IGeneralSelectProps,
  ISelectClassNames,
} from './types';

const THRESHOLD_HEIGHT = 30;

export const isScrolledToBottom = (event: SyntheticEvent<HTMLDivElement>) => {
  const { target } = event;
  const { scrollHeight, scrollTop, offsetHeight } = target as any;
  return scrollHeight - scrollTop - offsetHeight < THRESHOLD_HEIGHT;
};

export interface IBaseAsyncSelectProps<Option>
  extends Omit<
    IGeneralSelectProps<Option>,
    | 'options'
    | 'isLoading'
    | 'value'
    | 'isMobile'
    | 'onChange'
    | 'hasClearIcon'
    | 'onClear'
    | 'showLoadingMessage'
    | 'mobileBeforeHeader'
    | 'mobileAfterHeader'
    | 'mobileOptionListHeader'
    | 'mobileOptionListFooter'
  > {
  classNames?: {
    selectInputClassName?: string;
  } & ISelectClassNames;
  /**
   * Функция для запроса данных об опциях
   */
  loadOptions: (
    loadOptionsParams: ILoadOptionParams
  ) => Promise<ILoadOptionsData<Option>>;
  /**
   * Коллбек, выполняемый при смене опции
   */
  onChange: (option?: Option) => void;
  /**
   * Предикат для фильтрации загруженных опций
   */
  filterOptions?: (option: Option) => boolean;
  /**
   * Коллбек, выполняемый при изменении строки поиска
   */
  onChangeSearchValue?: (searchValue: string) => void;
  /**
   * Флаг, позволяющий искуственно добавить выбранную опцию к списку опций
   */
  alwaysAddSelectedOption?: boolean;
  /**
   * Наличие/отсутсвие дозагрузки опции при скролле
   */
  hasInfinityScroll?: boolean;
  /**
   * Флаг для перезагрузки опций, при выставлении в true перезапрашивает данные
   */
  needReload?: boolean;
  /**
   * Наличие/отсутсвие иконки очистки
   */
  isClearable?: boolean;
  /**
   * Информация по выбранной опции
   */
  selectedOptionData?: Partial<Option>;
  /**
   * Открыт/закрыт выпадающий список
   */
  isOpen: boolean;
  /**
   * Флаг мобильного разрешения
   */
  isMobile?: boolean;
  /**
   * Сеттер установки флага isOpen
   */
  setOpen: (isOpen: boolean) => void;
}

export const BaseAsyncSelect = <Option extends IBaseOptionType>({
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
    <SingleValueMemo
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
    <MobileSelectInputMemo
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
