import React, { memo } from 'react';
import cn from 'classnames/bind';

import { Checkbox } from '../../checkboxes/Checkbox';
import { IconDone } from '../../icons/IconDone';

import { OptionTemplate } from '../BaseSelect/Options/OptionTemplate';
import { IBaseOption, IOptionProps } from '../BaseSelect/Options/types';

import multiOptionStyle from './MultiOption.module.scss';

const cxMulti = cn.bind(multiOptionStyle);

export const NoMemoMultiOption = <Option extends IBaseOption>({
  name,
  isSelected,
  isMobile,
  isHovered,
  ...props
}: IOptionProps<Option>) => (
  <OptionTemplate
    {...props}
    className={cxMulti('option_multi')}
    name={name}
    isHovered={isMobile ? false : isHovered}
    isSelected={false}
    isMobile={isMobile}
  >
    {isMobile ? (
      <div className={cxMulti('checkbox')}>
        <Checkbox checked={isSelected} />
      </div>
    ) : (
      <div>
        <IconDone
          className={cxMulti('doneIcon', { doneIcon_selected: isSelected })}
        />
      </div>
    )}
    <p>{name}</p>
  </OptionTemplate>
);

export const MultiOption = memo(NoMemoMultiOption) as typeof NoMemoMultiOption;
