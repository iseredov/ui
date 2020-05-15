import { useCallback } from 'react';

import { IBaseOption } from '../../Options';

type ISingleSelectModeResult<Option> = (option: Option) => void;

export const useSingleSelectMode = <Option extends IBaseOption>(
  onChange: (optioons: Option[]) => void
): ISingleSelectModeResult<Option> => {
  const handleOptionClick = useCallback(
    (selectedOption: Option) => {
      onChange([selectedOption]);
    },
    [onChange]
  );

  return handleOptionClick;
};
