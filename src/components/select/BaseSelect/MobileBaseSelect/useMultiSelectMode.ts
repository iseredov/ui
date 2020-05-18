import { useCallback, useState, SyntheticEvent } from 'react';

import { IBaseOption } from '../Options/types';
import { switchSelectedOptions } from '../../helpers/switchSelectedOptions';

interface TMultiModeParams<Option> {
  initialSelectedOptions: Option[];
  getOptionId: (option?: Option) => IdType;
  onChange: (options: Option[]) => void;
  onCloseMenu: () => void;
}

interface TMultiModeResult<Option> {
  selectedOptions: Option[];
  multiHandleOptionClick: (option: Option) => void;
  multiHandleClear: (event: SyntheticEvent<Element>) => void;
  multiHandleApplyFilter: () => void;
}

export const useMultiSelectMode = <Option extends IBaseOption>({
  initialSelectedOptions = [],
  onChange,
  onCloseMenu,
  getOptionId,
}: TMultiModeParams<Option>): TMultiModeResult<Option> => {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>(
    initialSelectedOptions
  );

  const multiHandleOptionClick = useCallback(
    (selectedOption: Option) => {
      setSelectedOptions(
        switchSelectedOptions(selectedOptions, selectedOption, getOptionId)
      );
    },
    [selectedOptions, getOptionId]
  );

  const multiHandleClear = useCallback(() => {
    setSelectedOptions([]);
  }, []);

  const multiHandleApplyFilter = useCallback(() => {
    onChange(selectedOptions);
    onCloseMenu();
  }, [selectedOptions, onChange, onCloseMenu]);

  return {
    selectedOptions,
    multiHandleOptionClick,
    multiHandleClear,
    multiHandleApplyFilter,
  };
};
