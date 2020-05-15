import React, { memo, useCallback, ReactNode } from 'react';
import classNames from 'classnames/bind';
import noop from 'lodash/noop';

import { IOptionProps, IBaseOption } from './types';

import s from './Options.module.scss';

const cx = classNames.bind(s);

interface IProps<Option> extends IOptionProps<Option> {
  children: ReactNode;
}

export const BaseOptionTemplate = <Option extends IBaseOption>({
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
}: IProps<Option>) => {
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

export const OptionTemplate = memo(
  BaseOptionTemplate
) as typeof BaseOptionTemplate;
