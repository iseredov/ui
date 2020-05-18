import React, { memo } from 'react';

import { IconPin } from '../../../icons/IconPin';
import { OptionTemplate, IBaseOption, IOptionProps } from '../../BaseSelect';

import s from './MultiTagOption.module.scss';

const NoMemoMultiTagOption = <Option extends IBaseOption>({
  isMobile,
  name,
  isSelected,
  isHovered,
  ...props
}: IOptionProps<Option>) => (
  <OptionTemplate
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
  </OptionTemplate>
);

export const MultiTagOption = memo(
  NoMemoMultiTagOption
) as typeof NoMemoMultiTagOption;
