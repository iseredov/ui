import React, { useCallback } from 'react';

import { BaseSelect } from '../BaseSelect/BaseSelect';
import { IBaseOption } from '../Options/types';
import { IBaseSelectProps } from './types';

export const BaseSingleSelect = <Option extends IBaseOption>({
  options,
  isOpen,
  isClearable = false,
  hasDropDownIcon = true,
  setOpen,
  onChange,
  filterOptions,
  ...baseSelectProps
}: IBaseSelectProps<Option>) => {
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
