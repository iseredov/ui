import React, { memo } from 'react';
import cn from 'classnames/bind';

import { Checkbox } from '../checkboxes/Checkbox';
import { IconDone } from '../icons/IconDone';

import { OptionTemplateMemo } from './OptionTemplate';

import multiOptionStyle from './OptionMulti.module.scss';
import { IBaseOptionType, IOptionProps } from './types';

const cxMulti = cn.bind(multiOptionStyle);

export const OptionMulti = <Option extends IBaseOptionType>({
  name,
  isSelected,
  isMobile,
  isHovered,
  ...props
}: IOptionProps<Option>) => (
  <OptionTemplateMemo
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
  </OptionTemplateMemo>
);

export const OptionMultiMemo = memo(OptionMulti) as typeof OptionMulti;
