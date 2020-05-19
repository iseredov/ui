import { useCallback } from 'react';

import { IBaseOptionType } from '../types';

type ISingleSelectModeResult<Option> = (option: Option) => void;

export const useSingleSelectMode = <Option extends IBaseOptionType>(
  onChange: (options: Option[]) => void
): ISingleSelectModeResult<Option> =>
  useCallback(
    (selectedOption: Option) => {
      onChange([selectedOption]);
    },
    [onChange]
  );
