import React, { memo } from 'react';

import { IOptionProps, IBaseOption } from './types';
import { OptionTemplate } from './OptionTemplate';

const NoMemoOption = <Option extends IBaseOption>(
  props: IOptionProps<Option>
) => <OptionTemplate {...props}>{props.name}</OptionTemplate>;

export const Option = memo(NoMemoOption) as typeof NoMemoOption;
