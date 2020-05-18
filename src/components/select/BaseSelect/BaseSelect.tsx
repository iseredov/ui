import React, { useCallback, useMemo, useState, KeyboardEvent } from 'react';
import { Manager, Reference } from 'react-popper';
import cn from 'classnames/bind';
import noop from 'lodash/noop';

import { KEY_CODE } from '../../../shared/constants';

import {
  defaultGetOptionId,
  defaultGetOptionName,
  defaultLoadingMessage,
  defaultNoOptionsMessage,
} from '../helpers/defaultValues';
import { useElementWidth } from './useElementWidth';
import { OptionList } from './OptionList';
import { IBaseOption } from '../Options/types';
import { SelectPlaceholder, SelectText } from './SelectElements';
import { SelectIcons } from './SelectIcons';
import { IBaseSelectProps } from './types';

import style from './BaseSelect.module.scss';

const cx = cn.bind(style);

// Минимальный отступ до рамок окна браузера для списка опций
const VIEWPORT_PADDING = 16;

export const BaseSelect = <Option extends IBaseOption>({
  tabIndex = 0,
  dataName,
  classNames = {},
  hasAutoOptionListWidth = false,
  maxOptionListWidth,
  minOptionListWidth,
  value: selectedValue,
  options,
  placeholder = '',
  error = false,
  isOpen = false,
  isMobile = false,
  isLoading = false,
  isDisabled = false,
  showLoadingMessage = isLoading,
  onChange = noop,
  onBlur = noop,
  onFocus = noop,
  onScrollOptionList = noop,
  loadingMessage = defaultLoadingMessage,
  noOptionsMessage = defaultNoOptionsMessage,
  position,
  size = 'sm',
  customSelectInput,
  optionListHeader,
  optionListFooter,
  IconBeforeSelectInput,
  CustomOptionComponent,
  hasDropDownIcon = false,
  hasClearIcon = false,
  onSetOpen = noop,
  getOptionId = defaultGetOptionId,
  getOptionName = defaultGetOptionName,
  onClear = noop,
  ...mobileProps
}: IBaseSelectProps<Option>) => {
  const { select: selectCn = {}, option: optionCn } = classNames;

  const [optionHoverIndex, setOptionHoverIndex] = useState(0);

  const handleToggleMenu = useCallback(() => {
    if (!isDisabled) {
      onSetOpen(!isOpen);
    }
  }, [isOpen, isDisabled, onSetOpen]);

  const handleOpenMenu = useCallback(() => {
    if (!isDisabled) {
      onSetOpen(true);
    }
  }, [isDisabled, onSetOpen]);

  const handleCloseMenu = useCallback(() => {
    if (!isDisabled) {
      onSetOpen(false);
      setOptionHoverIndex(0);
    }
  }, [isDisabled, onSetOpen]);

  const handleSelectKeyDown = useCallback(
    ({ keyCode }: KeyboardEvent<HTMLElement>) => {
      if (!isOpen && keyCode === KEY_CODE.ENTER) {
        handleOpenMenu();
      }
    },
    [handleOpenMenu, isOpen]
  );

  const changeSelectedValue = useCallback(
    (options: Option[]) => {
      if (!isDisabled) {
        onChange(options);
      }
    },
    [isDisabled, onChange]
  );

  const renderSelectInput = useCallback(() => {
    const selectText = Array.isArray(selectedValue)
      ? getOptionName(selectedValue[0])
      : getOptionName(selectedValue);

    return selectText ? (
      <SelectText
        className={selectCn.selectText}
        isDisabled={isDisabled}
        Icon={IconBeforeSelectInput}
      >
        {selectText}
      </SelectText>
    ) : (
      <SelectPlaceholder
        className={selectCn.selectPlaceholder}
        Icon={IconBeforeSelectInput}
      >
        {placeholder}
      </SelectPlaceholder>
    );
  }, [
    selectedValue,
    isDisabled,
    placeholder,
    selectCn,
    IconBeforeSelectInput,
    getOptionName,
  ]);

  const { ref, width: selectWidth } = useElementWidth({
    needRecalculate: isOpen,
  });

  const wrapperRef = ref.current;

  const calculatedMaxOptionListWidth = useMemo(() => {
    if (
      !isOpen ||
      maxOptionListWidth !== undefined ||
      !hasAutoOptionListWidth ||
      !wrapperRef
    ) {
      return maxOptionListWidth;
    }

    const optionListClientRect = wrapperRef.getBoundingClientRect();

    return Math.max(
      window.innerWidth - optionListClientRect.left - VIEWPORT_PADDING,
      selectWidth
    );
  }, [
    hasAutoOptionListWidth,
    isOpen,
    maxOptionListWidth,
    wrapperRef,
    selectWidth,
  ]);

  const hasError = Boolean(error);

  return (
    <>
      {isOpen && !isMobile && (
        <div className={cx('curtain')} onClick={handleCloseMenu} />
      )}
      <Manager>
        <div
          ref={ref}
          className={cx(
            'wrapper',
            { wrapper_open: isOpen },
            { wrapper_openMobile: isOpen && isMobile },
            selectCn.wrapper
          )}
        >
          <Reference>
            {({ ref }) => (
              <div
                tabIndex={isDisabled ? -1 : tabIndex}
                ref={ref}
                className={cx(
                  {
                    innerWrapper: true,
                    [`innerWrapper_size_${size}`]: true,
                    [`innerWrapper_radius_${position}`]: true,
                    innerWrapper_focused: isOpen,
                    innerWrapper_error: hasError,
                    innerWrapper_focused_error: hasError && isOpen,
                    innerWrapper_disabled: isDisabled,
                  },
                  selectCn.innerWrapper
                )}
                data-name={dataName}
                onClick={handleToggleMenu}
                onFocus={onFocus}
                onBlur={onBlur}
                onKeyDown={handleSelectKeyDown}
              >
                <div
                  className={cx(
                    'selectInputWrapper',
                    selectCn.selectInputWrapper
                  )}
                >
                  {customSelectInput || renderSelectInput()}
                </div>

                <div className={cx('iconsWrapper', selectCn.iconsWrapper)}>
                  <SelectIcons
                    error={error}
                    isOpen={isOpen}
                    isLoading={isLoading}
                    isDisabled={isDisabled}
                    hasClearIcon={
                      hasClearIcon &&
                      Boolean(
                        Array.isArray(selectedValue)
                          ? selectedValue.length > 0
                          : Boolean(selectedValue)
                      )
                    }
                    hasDropDownIcon={hasDropDownIcon}
                    onClear={onClear}
                  />
                </div>
              </div>
            )}
          </Reference>

          {isOpen && (
            <OptionList
              {...mobileProps}
              selectWidth={selectWidth}
              hasAutoOptionListWidth={hasAutoOptionListWidth}
              minOptionListWidth={minOptionListWidth}
              maxOptionListWidth={calculatedMaxOptionListWidth}
              classNames={optionCn}
              value={selectedValue}
              options={options}
              isMobile={isMobile}
              isLoading={isLoading}
              hasClearIcon={hasClearIcon}
              showLoadingMessage={showLoadingMessage}
              optionHoverIndex={optionHoverIndex}
              loadingMessage={loadingMessage}
              noOptionsMessage={noOptionsMessage}
              optionListHeader={optionListHeader}
              optionListFooter={optionListFooter}
              CustomOptionComponent={CustomOptionComponent}
              onChange={changeSelectedValue}
              onClear={onClear}
              onScrollOptionList={onScrollOptionList}
              onCloseMenu={handleCloseMenu}
              onSetOptionHoverIndex={setOptionHoverIndex}
              getOptionId={getOptionId}
              getOptionName={getOptionName}
            />
          )}
        </div>
      </Manager>
    </>
  );
};
