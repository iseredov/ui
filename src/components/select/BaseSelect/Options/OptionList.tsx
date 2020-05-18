import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Popper, PopperChildrenProps } from 'react-popper';
import classNames from 'classnames/bind';
import noop from 'lodash/noop';

import { Portal } from '../../../Portal';
import { KEY_CODE } from '../../../../shared/constants';

import {
  defaultGetOptionId,
  defaultGetOptionName,
  defaultLoadingMessage,
  defaultNoOptionsMessage,
} from '../defaultValues';
import { hasWord, scrollTopIntoView, switchSelectedOptions } from '../helpers';
import { MobileBaseSelect } from '../MobileBaseSelect';
import { OptionsScrollBlock } from './OptionsScrollBlock';
import { IBaseOption, IOptionListProps } from './types';

import style from './Options.module.scss';

const cx = classNames.bind(style);

export const OptionList = <Option extends IBaseOption>({
  mobileName,
  selectWidth,
  hasAutoOptionListWidth = false,
  maxOptionListWidth,
  minOptionListWidth = selectWidth,
  classNames = {},
  value,
  options = [],
  optionHoverIndex = -1,
  isMobile = false,
  isLoading = false,
  hasClearIcon,
  showLoadingMessage = isLoading,
  loadingMessage = defaultLoadingMessage,
  noOptionsMessage = defaultNoOptionsMessage,
  onCloseMenu = noop,
  onSetOptionHoverIndex = noop,
  onChange = noop,
  onClear = noop,
  onScrollOptionList = noop,
  getOptionId = defaultGetOptionId,
  getOptionName = defaultGetOptionName,
  optionListHeader,
  optionListFooter,
  CustomOptionComponent,
  ...mobileProps
}: IOptionListProps<Option>) => {
  const optionsMaxIndex = useMemo(() => options.length - 1, [options.length]);
  const hoverOptionRef = useRef<HTMLLIElement | null>(null);

  const scrollToHoverOption = useCallback(() => {
    if (hoverOptionRef.current) {
      scrollTopIntoView(hoverOptionRef.current, false);
    }
  }, []);

  const setNextHoverIndex = useCallback(() => {
    const nextIndex =
      optionHoverIndex + 1 <= optionsMaxIndex ? optionHoverIndex + 1 : 0;
    onSetOptionHoverIndex(nextIndex);
  }, [optionHoverIndex, optionsMaxIndex, onSetOptionHoverIndex]);

  const setPrevHoverIndex = useCallback(() => {
    const nextIndex =
      optionHoverIndex - 1 >= 0 ? optionHoverIndex - 1 : optionsMaxIndex;
    onSetOptionHoverIndex(nextIndex);
  }, [optionHoverIndex, optionsMaxIndex, onSetOptionHoverIndex]);

  const handleChangeOption = useCallback(
    (newSelectedOption: Option) => {
      const newSelectedOptions = Array.isArray(value)
        ? switchSelectedOptions(value, newSelectedOption, getOptionId)
        : [newSelectedOption];
      onChange(newSelectedOptions);
    },
    [onChange, getOptionId, value]
  );

  const changeSelectedOption = useCallback(() => {
    if (optionHoverIndex in options) {
      handleChangeOption(options[optionHoverIndex]);
    }
  }, [options, optionHoverIndex, handleChangeOption]);

  const handleDocumentKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // TODO: переехать на code, нативный keyCode deprecated
      switch (event.keyCode) {
        case KEY_CODE.ESC:
          onCloseMenu();
          break;
        case KEY_CODE.TAB:
          event.preventDefault();
          changeSelectedOption();
          break;
        case KEY_CODE.ENTER:
          event.preventDefault();
          changeSelectedOption();
          break;
        case KEY_CODE.ARROW_UP:
          event.preventDefault();
          setPrevHoverIndex();
          scrollToHoverOption();
          break;
        case KEY_CODE.ARROW_DOWN:
          event.preventDefault();
          setNextHoverIndex();
          scrollToHoverOption();
          break;
        default:
          break;
      }
    },
    [
      scrollToHoverOption,
      onCloseMenu,
      setPrevHoverIndex,
      setNextHoverIndex,
      changeSelectedOption,
    ]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleDocumentKeyDown);
    return () => {
      document.removeEventListener('keydown', handleDocumentKeyDown);
    };
  }, [handleDocumentKeyDown]);

  const generalProps = {
    value,
    options,
    selectWidth,
    optionHoverIndex,
    getOptionId,
    getOptionName,
    onSetOptionHoverIndex,
    onScrollOptionList,
    CustomOptionComponent,
  };

  return (
    <Portal>
      {isMobile ? (
        <MobileBaseSelect
          {...generalProps}
          {...mobileProps}
          name={mobileName}
          hasClearButton={hasClearIcon}
          onChange={onChange}
          onClear={onClear}
          onCloseMenu={onCloseMenu}
        />
      ) : (
        <Popper placement="bottom-start">
          {({ placement, ref, style, forceUpdate }: PopperChildrenProps) => (
            <div
              style={{
                ...style,
                width: hasAutoOptionListWidth ? 'auto' : selectWidth,
                minWidth: minOptionListWidth,
                maxWidth: maxOptionListWidth,
              }}
              ref={ref}
              className={cx(
                'optionListWrapper',
                {
                  optionListWrapper_topMargin: hasWord('bottom', placement),
                  optionListWrapper_bottomMargin: hasWord('top', placement),
                },
                classNames.optionListWrapper
              )}
              data-placement={placement}
              data-name="selectPopup"
            >
              {optionListHeader}

              <OptionsScrollBlock
                {...generalProps}
                classNames={classNames}
                hoverOptionRef={hoverOptionRef}
                isLoading={isLoading}
                showLoadingMessage={showLoadingMessage}
                noOptionsMessage={noOptionsMessage}
                loadingMessage={loadingMessage}
                onChange={handleChangeOption}
                scheduleUpdate={forceUpdate}
              />

              {optionListFooter}
            </div>
          )}
        </Popper>
      )}
    </Portal>
  );
};
