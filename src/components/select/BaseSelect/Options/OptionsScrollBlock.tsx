import React, { useCallback, useEffect, useMemo } from 'react';
import classNames from 'classnames/bind';
import debounce from 'lodash/debounce';
import noop from 'lodash/noop';

import { ScrollBlock } from '../../../ScrollBlock';

import { areOptionsEqual } from '../helpers/areOptionsEqual';
import {
  defaultGetOptionId,
  defaultGetOptionName,
  defaultLoadingMessage,
  defaultNoOptionsMessage,
} from '../../defaultValues';
import { IBaseOption, IOptionProps, IOptionsScrollBlockProps } from './types';
import { Option } from './Option';

import style from './Options.module.scss';

const cx = classNames.bind(style);

export const OptionsScrollBlock = <T extends IBaseOption>({
  hoverOptionRef,
  selectWidth,
  classNames = {},
  value: selectedValue,
  options = [],
  optionHoverIndex,
  isLoading = false,
  showLoadingMessage = isLoading,
  loadingMessage = defaultLoadingMessage,
  noOptionsMessage = defaultNoOptionsMessage,
  scheduleUpdate,
  onSetOptionHoverIndex = noop,
  onChange = noop,
  onScrollOptionList = noop,
  getOptionId = defaultGetOptionId,
  getOptionName = defaultGetOptionName,
  CustomOptionComponent,
}: IOptionsScrollBlockProps<T>) => {
  useEffect(() => {
    scheduleUpdate();
  }, [options.length, scheduleUpdate]);

  const renderOption = useCallback(
    (currentOption: T, index: number) => {
      const isSelected = Array.isArray(selectedValue)
        ? selectedValue.some(selectedOption =>
            areOptionsEqual(getOptionId, currentOption, selectedOption)
          )
        : areOptionsEqual(getOptionId, currentOption, selectedValue);

      const isHovered = optionHoverIndex === index;

      const key = getOptionId(currentOption) || index;

      const generalOptionProps: IOptionProps<T> = {
        hoverOptionRef: isHovered ? hoverOptionRef : undefined,
        className: classNames.option,
        name: getOptionName(currentOption),
        value: currentOption,
        index,
        selectWidth,
        isMobile: false,
        isSelected,
        isHovered,
        onClick: onChange,
        onSetOptionHoverIndex,
      };

      if (CustomOptionComponent) {
        return <CustomOptionComponent key={key} {...generalOptionProps} />;
      }

      return <Option key={key} {...generalOptionProps} />;
    },
    [
      hoverOptionRef,
      selectedValue,
      optionHoverIndex,
      classNames,
      selectWidth,
      onChange,
      onSetOptionHoverIndex,
      getOptionId,
      getOptionName,
      CustomOptionComponent,
    ]
  );

  const renderNoOptionMessage = useCallback(
    (message: string) => (
      <p className={cx('noOptionMessageText', classNames.noOptionMessageText)}>
        {message}
      </p>
    ),
    [classNames]
  );

  const renderOptionList = useCallback(
    (options: T[]) => {
      if (showLoadingMessage) {
        return renderNoOptionMessage(loadingMessage);
      }

      if (options.length === 0) {
        return renderNoOptionMessage(noOptionsMessage);
      }

      return (
        <ul className={cx('optionList', classNames.optionList)}>
          {options.map(renderOption)}
        </ul>
      );
    },
    [
      noOptionsMessage,
      loadingMessage,
      showLoadingMessage,
      classNames,
      renderOption,
      renderNoOptionMessage,
    ]
  );

  const handleScroll = useMemo(() => debounce(onScrollOptionList, 150), [
    onScrollOptionList,
  ]);

  return (
    <ScrollBlock
      autoHeight
      autoHeightMin={0}
      autoHeightMax={210}
      autoHide
      onScroll={handleScroll}
    >
      {renderOptionList(options)}
    </ScrollBlock>
  );
};
