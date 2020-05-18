import React, { useCallback, useMemo, useState } from 'react';
import keyBy from 'lodash/keyBy';

import { MobileSelectInput } from '../Async/components/SelectInput';
import { IBaseOption } from '../BaseSelect/Options/types';
import { defaultGetOptionId, defaultGetOptionName } from '../defaultValues';
import { BaseMultiSelect } from '../MultiSelect/BaseMultiSelect';
import { IBaseMultiSelectProps } from '../MultiSelect/types';
import { MultiTagSelectInput } from '../components/MultiTagSelectInput';
import { MultiTagOption } from '../components/MultiTagOption';

const NOT_SELECTED_HOVER_INDEX = -1;

export interface ITag {
  id: IdType;
  name: string;
}

export const BaseMultiTagSelect = <Option extends IBaseOption>({
  selectedOptions,
  options,
  placeholder = '',
  isMobile = false,
  isInitialOpen = false,
  onChange,
  getOptionId = defaultGetOptionId,
  getOptionName = defaultGetOptionName,
  IconBeforeSelectInput,
  ...props
}: IBaseMultiSelectProps<Option>) => {
  const [isOpen, setOpen] = useState(isInitialOpen);
  const [inputValue, setInputValue] = useState('');
  const [tagHoverIndex, setHoverIndexTag] = useState(NOT_SELECTED_HOVER_INDEX);

  const handleSelectOpen = useCallback((isOpen: boolean) => {
    setOpen(isOpen);

    if (!isOpen) {
      setInputValue('');
      setHoverIndexTag(NOT_SELECTED_HOVER_INDEX);
    }
  }, []);

  const handleChange = useCallback(
    (options: Option[]) => {
      setInputValue('');
      onChange(options);
    },
    [onChange]
  );

  const handleDeleteTag = useCallback(
    (deletedOptionId: IdType) => {
      const filteredOptions = selectedOptions.filter(
        option => getOptionId(option) !== deletedOptionId
      );
      onChange(filteredOptions);
    },
    [selectedOptions, onChange, getOptionId]
  );

  const selectedOptionsHashMap = useMemo(
    () => keyBy(selectedOptions, getOptionId),
    [selectedOptions, getOptionId]
  );

  const unSelectedOptions = useMemo(
    () =>
      // @ts-ignore
      options.filter(option => !selectedOptionsHashMap[getOptionId(option)]),
    [options, selectedOptionsHashMap, getOptionId]
  );

  const selectedTags: ITag[] = useMemo(
    () =>
      selectedOptions.map(option => ({
        id: getOptionId(option),
        name: getOptionName(option),
      })),
    [selectedOptions, getOptionId, getOptionName]
  );

  const hasInputValueInOption = useCallback(
    (option: Option) => {
      const optionNameInLowerCase = getOptionName(option).toLocaleLowerCase();
      const inputValueInLowerCase = inputValue.toLocaleLowerCase();
      return optionNameInLowerCase.includes(inputValueInLowerCase);
    },
    [inputValue, getOptionName]
  );

  const filteredOptions = isMobile
    ? options.filter(hasInputValueInOption)
    : unSelectedOptions.filter(hasInputValueInOption);

  return (
    <BaseMultiSelect
      {...props}
      isOpen={isOpen}
      isMobile={isMobile}
      selectedOptions={selectedOptions}
      options={filteredOptions}
      customSelectInput={
        <MultiTagSelectInput
          isOpen={isOpen}
          inputValue={inputValue}
          placeholder={placeholder}
          selectedTags={selectedTags}
          tagHoverIndex={tagHoverIndex}
          setHoverIndexTag={setHoverIndexTag}
          onChangeInputValue={setInputValue}
          onDeleteTag={handleDeleteTag}
        />
      }
      CustomOptionComponent={MultiTagOption}
      mobileAfterHeader={
        <MobileSelectInput
          placeholder={placeholder}
          searchValue={inputValue}
          CustomIcon={IconBeforeSelectInput}
          onChange={setInputValue}
        />
      }
      IconBeforeSelectInput={IconBeforeSelectInput}
      onSetOpen={handleSelectOpen}
      onChange={handleChange}
      getOptionId={getOptionId}
      getOptionName={getOptionName}
    />
  );
};
