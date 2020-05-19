import React, { memo } from 'react';

import { IconPin } from '../icons/IconPin';
import { OptionTemplateMemo } from './OptionTemplate';

import s from './OptionMultiTag.module.scss';
import { IBaseOptionType, IOptionProps } from './types';

const NoMemoMultiTagOption = <Option extends IBaseOptionType>({
  isMobile,
  name,
  isSelected,
  isHovered,
  ...props
}: IOptionProps<Option>) => (
  <OptionTemplateMemo
    {...props}
    isMobile={isMobile}
    name={name}
    isSelected={false}
    isHovered={isMobile ? false : isHovered}
  >
    <div className={s.option}>
      {name}
      <div className={s.option__iconWrapper}>
        {isMobile && isSelected && <IconPin className={s.option__icon} />}
      </div>
    </div>
  </OptionTemplateMemo>
);

export const OptionMultiTag = memo(
  NoMemoMultiTagOption
) as typeof NoMemoMultiTagOption;
