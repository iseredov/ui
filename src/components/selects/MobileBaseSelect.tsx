import React, {
  useEffect,
  useMemo,
  ComponentType,
  ReactNode,
  SyntheticEvent,
} from 'react';
import cn from 'classnames/bind';
import noop from 'lodash/noop';

import { Portal } from '../Portal';
import { Button } from '../buttons/Button';
import { ScrollBlock } from '../ScrollBlock';
import { IconArrow } from '../icons/IconArrow';

import { areOptionsEqual } from './helpers/areOptionsEqual';
import {
  defaultGetOptionId,
  defaultGetOptionName,
} from './helpers/defaultValues';
import { OptionMemo as MobileOption } from './Option';
import { useMobileSelectMode } from './hooks/useMobileSelectMode';

import style from './MobileBaseSelect.module.scss';
import { IBaseOptionType, IOptionProps } from './types';

const cx = cn.bind(style);

export interface IMobileBaseSelectProps<Option> {
  /**
   * Название селекта (выводится в шапке модалки)
   */
  mobileName: string;
  /**
   * Слот перед содержимым шапки мобильного вида
   */
  mobileBeforeHeader?: ReactNode;
  /**
   * Слот после содержимого шапки мобильного вида
   */
  mobileAfterHeader?: ReactNode;
  /**
   * Шапка для списка опций мобильного вида
   */
  mobileOptionListHeader?: ReactNode;
  /**
   * Подвал для списка опций мобильного вида
   */
  mobileOptionListFooter?: ReactNode;
  /**
   * Выбранная опция/опции
   */
  value?: Option | Option[];
  /**
   * Все доступные опции
   */
  options: Option[];
  /**
   * Ширина селекта (не используется),
   * нужна для гомогенности интерфесов десктопной и мобильной версии
   */
  selectWidth: number;
  /**
   * Индекс опции в фокусе (на мобиле не работает, т.к. нет действия onFocus)
   * нужен для гомогенности интерфесов десктопной и мобильной версии
   */
  optionHoverIndex?: number;
  /**
   * Кнопка сброса выбранной опции/опций
   */
  hasClearButton?: boolean;
  /**
   * Коллбек на выбор опции
   */
  onChange: (options: Option[]) => void;
  /**
   * Коллбек при нажатии на кнопку очистить
   */
  onClear: (event: SyntheticEvent<Element>) => void;
  /**
   * Коллбек на закрытие модального окна с селектом
   */
  onCloseMenu: () => void;
  /**
   * Сеттер опции в фокусе (не используется)
   * нужен для гомогенности интерфесов десктопной и мобильной версии
   */
  onSetOptionHoverIndex: (index: number) => void;
  /**
   * Геттер для id опции
   */
  getOptionId?: (option?: Option) => IdType;
  /**
   * Геттер для имени опции
   */
  getOptionName?: (option?: Option) => string;
  /**
   * Коллбек на скролл списка опций
   */
  onScrollOptionList?: (event: SyntheticEvent<HTMLDivElement>) => void;
  /**
   * Кастомный компонент опции (нужен для нестандартного дизайна опции или поведения)
   */
  CustomOptionComponent?: ComponentType<IOptionProps<Option>>;
}

export const MobileBaseSelect = <Option extends IBaseOptionType>({
  mobileName,
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
                {mobileName}
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
