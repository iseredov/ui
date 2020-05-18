import { SyntheticEvent } from 'react';

import { IBaseOption } from '../../Options/types';
import { useMultiSelectMode } from './useMultiSelectMode';
import { useSingleSelectMode } from './useSingleSelectMode';

interface TMobileModeParameters<Option> {
  value?: Option | Option[];
  onChange: (options: Option[]) => void;
  onClear: (event: SyntheticEvent<Element>) => void;
  getOptionId: (option?: Option) => IdType;
  onCloseMenu: () => void;
}

interface TMobileSelectModeResult<Option> {
  isMultiMode: boolean;
  selectedValue?: Option | Option[];
  handleOptionClick: (option: Option) => void;
  handleClear: (event: SyntheticEvent<Element>) => void;
  handleApplyFilter?: () => void;
}

export const useMobileSelectMode = <Option extends IBaseOption>({
  value,
  onChange,
  onClear,
  getOptionId,
  onCloseMenu,
}: TMobileModeParameters<Option>): TMobileSelectModeResult<Option> => {
  const handleOptionClickSingle = useSingleSelectMode(onChange);
  const {
    selectedOptions,
    multiHandleOptionClick,
    multiHandleClear,
    multiHandleApplyFilter,
  } = useMultiSelectMode({
    initialSelectedOptions: Array.isArray(value) ? value : [],
    getOptionId,
    onChange,
    onCloseMenu,
  });

  const isMultiMode = Array.isArray(value);
  const selectedValue = isMultiMode ? selectedOptions : value;

  return {
    isMultiMode,
    selectedValue,
    handleOptionClick: isMultiMode
      ? multiHandleOptionClick
      : handleOptionClickSingle,
    handleClear: isMultiMode ? multiHandleClear : onClear,
    handleApplyFilter: isMultiMode ? multiHandleApplyFilter : undefined,
  };
};
