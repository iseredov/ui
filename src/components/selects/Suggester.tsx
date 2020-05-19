import React, { useCallback, useMemo, useState } from 'react';
import noop from 'lodash/noop';

import { BaseSelect } from './BaseSelect';
import { defaultGetOptionName } from './helpers/defaultValues';
import { SingleValueMemo } from './SingleValue';
import {
  ILoadOptionParams,
  ILoadOptionsData,
  useSearchLoadData,
} from './hooks/useSearchLoadData';
import {
  IBaseOptionType,
  IGeneralSelectProps,
  ISelectClassNames,
  SelectPosition,
  SelectSize,
} from './types';

export interface ISuggesterProps<Option>
  extends Omit<
    IGeneralSelectProps<Option>,
    | 'showLoadingMessage'
    | 'options'
    | 'value'
    | 'mobileName'
    | 'isLoading'
    | 'onChange'
    | 'getOptionId'
    | 'hasClearIcon'
    | 'onClear'
    | 'isOpen'
    | 'onSetOpen'
    | 'customSelectInput'
  > {
  value: string;
  loadOptions: (params: ILoadOptionParams) => Promise<ILoadOptionsData<Option>>;
  classNames?: {
    selectInputClassName?: string;
  } & ISelectClassNames;
  dataName?: string;
  maxOptionListWidth?: number;
  minOptionListWidth?: number;
  placeholder?: string;
  size?: SelectSize;
  position?: SelectPosition;
  error?: boolean | string;
  isDisabled?: boolean;
  isInitialOpen?: boolean;
  isClearable?: boolean;
  getOptionName?: (option?: Option) => string;
  onChange: (value: string) => void;
}

export const Suggester = <Option extends IBaseOptionType>({
  value,
  loadOptions,
  classNames = {},
  placeholder = 'Начните вводить',
  isInitialOpen = false,
  getOptionName = defaultGetOptionName,
  onChange = noop,
  isClearable = false,
  ...props
}: ISuggesterProps<Option>) => {
  const { selectInputClassName, ...otherClassNames } = classNames;

  const [isOpen, setOpen] = useState(isInitialOpen);

  const { options, isLoading } = useSearchLoadData({
    loadOptions,
    searchValue: value,
  });

  const handleSelectOption = useCallback(
    ([selectedOption]: Option[]) => {
      onChange(getOptionName(selectedOption));
      setOpen(false);
    },
    [onChange, getOptionName]
  );
  const handleClear = useCallback(() => onChange(''), [onChange]);

  const selectInput = (
    <SingleValueMemo
      suggestInputClassName={selectInputClassName}
      selectTextClassName={otherClassNames?.select?.selectText}
      selectPlaceholderClassName={otherClassNames?.select?.selectPlaceholder}
      isOpen={isOpen}
      selectedOptionName={value}
      placeholder={placeholder}
      searchValue={value}
      onChange={onChange}
    />
  );

  const showOptionList = isOpen && options.length > 0;
  const selectedOption = useMemo(() => (value ? { name: value } : undefined), [
    value,
  ]) as Option | undefined;

  return (
    <BaseSelect
      {...props}
      mobileName="" // TODO: реализовать мобильную версию для Suggester
      classNames={otherClassNames}
      isOpen={showOptionList}
      onSetOpen={setOpen}
      value={selectedOption}
      options={options}
      isMobile={false}
      isLoading={isLoading}
      showLoadingMessage={false}
      customSelectInput={selectInput}
      onChange={handleSelectOption}
      getOptionId={getOptionName}
      getOptionName={getOptionName}
      onClear={handleClear}
      hasClearIcon={isClearable}
    />
  );
};
