import React from 'react';

import { IOptionProps, IBaseOption } from './types';
import { OptionTemplate } from './OptionTemplate';

export const Option = <Option extends IBaseOption>(
  props: IOptionProps<Option>
) => <OptionTemplate {...props}>{props.name}</OptionTemplate>;
