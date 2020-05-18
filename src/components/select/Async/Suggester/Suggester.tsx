import React, { useCallback, useMemo, useState } from 'react';
import noop from 'lodash/noop';
import get from 'lodash/get';

import { BaseSelect } from '../../BaseSelect/BaseSelect';
import { IBaseOption } from '../../BaseSelect/Options/types';
import { defaultGetOptionName } from '../../defaultValues';
import { SelectInput } from '../components/SelectInput';
import { useSearchLoadData } from '../hooks/useSearchLoadData';
import { ISuggesterProps } from './types';

export const Suggester = <Option extends IBaseOption>({
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
    <SelectInput
      suggestInputClassName={selectInputClassName}
      selectTextClassName={get(otherClassNames, 'select.selectText')}
      selectPlaceholderClassName={get(
        otherClassNames,
        'select.selectPlaceholder'
      )}
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
      mobileName="" // убрать, когда в компонент заедет мобильный полноэранный вид
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
