import React, { useCallback, useMemo } from 'react';
import noop from 'lodash/noop';

import { IBaseOption } from '../Options/types';
import { Rack, IRackProps } from './Rack';

export interface ISingleRackProps<Option, SelectedOption>
  extends Omit<
    IRackProps<Option, SelectedOption>,
    'selectedOptions' | 'onChange'
  > {
  selectedOption?: SelectedOption;
  onChange?: (selectedOption?: SelectedOption) => void;
}

export const SingleRack = <
  Option extends IBaseOption,
  SelectedOption extends Partial<Option>
>({
  selectedOption,
  onChange = noop,
  ...props
}: ISingleRackProps<Option, SelectedOption>) => {
  const selectedOptions: SelectedOption[] = useMemo(
    () => (selectedOption ? [selectedOption] : []),
    [selectedOption]
  );
  const handleChange = useCallback(
    ([selectedOption]: SelectedOption[]) => onChange(selectedOption),
    [onChange]
  );

  return (
    <Rack
      {...props}
      selectedOptions={selectedOptions}
      onChange={handleChange}
      isMulti={false}
      isLimitSelectedOptions={false}
      isDeleteSelectedFromOptionList={false}
    />
  );
};
