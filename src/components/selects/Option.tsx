import React, { memo } from 'react';

import { OptionTemplateMemo } from './OptionTemplate';
import { IBaseOptionType, IOptionProps } from './types';

const Option = <Option extends IBaseOptionType>(
  props: IOptionProps<Option>
) => <OptionTemplateMemo {...props}>{props.name}</OptionTemplateMemo>;

export const OptionMemo = memo(Option) as typeof Option;
