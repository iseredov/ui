import React, { memo, useCallback, ReactNode } from 'react';
import classNames from 'classnames/bind';
import noop from 'lodash/noop';

import s from './OptionTemplate.module.scss';
import { IBaseOptionType, IOptionProps } from './types';

const cx = classNames.bind(s);

export interface IOptionTemplateProps<Option> extends IOptionProps<Option> {
  children: ReactNode;
}

export const OptionTemplate = <Option extends IBaseOptionType>({
  hoverOptionRef,
  className,
  children,
  value,
  index = -1,
  isMobile,
  isSelected,
  isHovered = false,
  onClick = noop,
  onSetOptionHoverIndex = noop,
}: IOptionTemplateProps<Option>) => {
  const handleSetHoverIndex = useCallback(() => {
    if (!isHovered) {
      onSetOptionHoverIndex(index);
    }
  }, [index, isHovered, onSetOptionHoverIndex]);

  const handleSelectOption = useCallback(() => {
    onClick(value);
  }, [value, onClick]);

  return (
    <li
      className={cx(
        'option',
        { option_mobile: isMobile },
        { option_selected: isSelected },
        { option_hovered: isMobile ? false : isHovered },
        className
      )}
      ref={hoverOptionRef}
      onClick={handleSelectOption}
      onMouseMove={handleSetHoverIndex}
      data-name="select-option"
    >
      {children}
    </li>
  );
};

export const OptionTemplateMemo = memo(OptionTemplate) as typeof OptionTemplate;
