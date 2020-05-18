import React, { useMemo, useEffect } from 'react';
import cn from 'classnames/bind';
import noop from 'lodash/noop';

import { Portal } from '../../Portal';
import { Button } from '../../buttons/Button';
import { ScrollBlock } from '../../ScrollBlock';
import { IconArrow } from '../../icons/IconArrow';

import { areOptionsEqual } from '../helpers/areOptionsEqual';
import {
  defaultGetOptionId,
  defaultGetOptionName,
} from '../helpers/defaultValues';
import { Option as MobileOption } from '../Options/Option';
import { IBaseOption, IOptionProps } from '../Options/types';
import { useMobileSelectMode } from './useMobileSelectMode';
import { IMobileBaseSelectProps } from './types';

import style from './MobileBaseSelect.module.scss';

const cx = cn.bind(style);

export const MobileBaseSelect = <Option extends IBaseOption>({
  name,
  value,
  options,
  selectWidth,
  optionHoverIndex = -1,
  hasClearButton = false,
  mobileBeforeHeader,
  mobileAfterHeader,
  mobileOptionListHeader,
  mobileOptionListFooter,
  onChange,
  onClear,
  onCloseMenu,
  onSetOptionHoverIndex,
  getOptionId = defaultGetOptionId,
  getOptionName = defaultGetOptionName,
  onScrollOptionList = noop,
  CustomOptionComponent,
}: IMobileBaseSelectProps<Option>) => {
  const {
    isMultiMode,
    selectedValue,
    handleOptionClick,
    handleApplyFilter,
    handleClear,
  } = useMobileSelectMode<Option>({
    value,
    onClear,
    onChange,
    onCloseMenu,
    getOptionId,
  });

  useEffect(() => {
    window.addEventListener('onpopstate', onCloseMenu);

    return () => {
      window.removeEventListener('onpopstate', onCloseMenu);
    };
  }, [onCloseMenu]);

  const amountSelectedValue = useMemo(() => {
    if (Array.isArray(selectedValue)) {
      return selectedValue.length;
    }

    return selectedValue ? 1 : 0;
  }, [selectedValue]);

  return (
    <Portal>
      <div className={cx('background')}>
        <div className={cx('topWrapper')}>
          {mobileBeforeHeader}

          <div className={cx('row')}>
            <div className={cx('group')}>
              <Button
                className={cx('closeButton')}
                appearance="secondary"
                onClick={onCloseMenu}
              >
                <IconArrow rotate={90} />
              </Button>
              <p className={cx('name')}>
                {name}{' '}
                {`${
                  isMultiMode && amountSelectedValue > 1
                    ? `(${amountSelectedValue})`
                    : ''
                }`}
              </p>
            </div>
            {amountSelectedValue > 0 && hasClearButton && (
              <div className={cx('group')}>
                <Button onClick={handleClear}>Сбросить</Button>
              </div>
            )}
          </div>

          {mobileAfterHeader}
        </div>

        {mobileOptionListHeader}

        <div className={cx('scrollBlockWrapper')}>
          {options.length > 0 && (
            <ScrollBlock
              style={{ height: 'calc(100% - 48px)' }}
              autoHide
              onScroll={onScrollOptionList}
            >
              <ul className={cx('optionList')}>
                {options.map((currentOption, index) => {
                  const isSelected = Array.isArray(selectedValue)
                    ? selectedValue.some(selectedOption =>
                        areOptionsEqual(
                          getOptionId,
                          currentOption,
                          selectedOption
                        )
                      )
                    : areOptionsEqual(
                        getOptionId,
                        currentOption,
                        selectedValue
                      );

                  const key = String(getOptionId(currentOption));

                  const generalProps: IOptionProps<Option> = {
                    name: getOptionName(currentOption),
                    value: currentOption,
                    index,
                    selectWidth,
                    isSelected,
                    isMobile: true,
                    isHovered: optionHoverIndex === index,
                    onSetOptionHoverIndex,
                    onClick: handleOptionClick,
                  };

                  if (CustomOptionComponent) {
                    return (
                      <CustomOptionComponent key={key} {...generalProps} />
                    );
                  }

                  return <MobileOption key={key} {...generalProps} />;
                })}
              </ul>
            </ScrollBlock>
          )}

          {mobileOptionListFooter}
        </div>

        {isMultiMode && (
          <Button
            className={cx('applyButton')}
            appearance="primary"
            onClick={handleApplyFilter}
            wide
          >
            Применить
          </Button>
        )}
      </div>
    </Portal>
  );
};
