import React, { useCallback, useMemo } from 'react';
import noop from 'lodash/noop';

import { IBaseOption } from '../Options/types';
import { AsyncRack, IAsyncRackProps } from './AsyncRack';

export interface IAsyncSingleRackProps<Option, SelectedOption>
  extends Omit<
    IAsyncRackProps<Option, SelectedOption>,
    'selectedOptions' | 'onChange'
  > {
  selectedOption?: SelectedOption;
  onChange?: (selectedOption?: SelectedOption) => void;
}

export const AsyncSingleRack = <
  Option extends IBaseOption,
  SelectedOption extends Partial<Option>
>({
  selectedOption,
  onChange = noop,
  ...props
}: IAsyncSingleRackProps<Option, SelectedOption>) => {
  const selectedOptions = useMemo(
    () => (selectedOption ? [selectedOption] : []),
    [selectedOption]
  );

  const handleChange = useCallback(
    ([selectedOption]: SelectedOption[]) => {
      onChange(selectedOption);
    },
    [onChange]
  );

  return (
    <AsyncRack
      {...props}
      selectedOptions={selectedOptions}
      onChange={handleChange}
      isMulti={false}
      isLimitSelectedOptions={false}
      isDeleteSelectedFromOptionList={false}
    />
  );
};
