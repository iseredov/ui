import React, {
  useCallback,
  useEffect,
  useMemo,
  Ref,
  SyntheticEvent,
  ComponentType,
} from 'react';
import classNames from 'classnames/bind';
import debounce from 'lodash/debounce';
import noop from 'lodash/noop';

import { ScrollBlock } from '../ScrollBlock';

import { areOptionsEqual } from './helpers/areOptionsEqual';
import {
  defaultGetOptionId,
  defaultGetOptionName,
  defaultLoadingMessage,
  defaultNoOptionsMessage,
} from './helpers/defaultValues';
import { OptionMemo } from './Option';

import style from './BaseSelect.module.scss';
import { IBaseOptionType, IOptionClassNames, IOptionProps } from './types';

const cx = classNames.bind(style);

export interface IOptionsScrollBlockProps<Option> {
  /**
   * Конфиг с именами классов для OptionList
   */
  classNames?: IOptionClassNames;
  /**
   * Ширина селекта на странице (актуальна только для десктоп разрешния)
   */
  selectWidth: number;
  /**
   * Флаг, если выставлен в true - то выпадающий список растягивается на ширину самой длинной опции
   */
  hasAutoOptionListWidth?: boolean;
  /**
   * Минимальная ширина выпадающего списка
   */
  minOptionListWidth?: number;
  /**
   * Максимальная ширина выпадающего списка,
   * по умолчанию равна ширине селекта
   */
  maxOptionListWidth?: number;
  /**
   * Выбранная опция/опции
   */
  value?: Option | Option[];
  /**
   * Опции для выбора
   */
  options: Option[];
  /**
   * Индекс опции, которая находится в состоянии hover
   */
  optionHoverIndex: number;
  /**
   * Ref для опции, в состоянии hover
   * Нужен для навигации с клавиатуры (конкретно для скролла)
   */
  hoverOptionRef: Ref<HTMLLIElement>;
  /**
   * На мобильном разрешении (от 699px) (true)
   * или на десктопе (false)
   */
  isMobile?: boolean;
  /**
   * Наличие индикатора загрузки
   */
  isLoading?: boolean;
  /**
   * Показывать / не показывать сообщение о загрузке
   */
  showLoadingMessage?: boolean;
  /**
   * Сообщение, отображаемое, когда происходит загрузка
   */
  loadingMessage?: string;
  /**
   * Сообщение, отображаемое, когда в селекте нет опций
   */
  noOptionsMessage?: string;
  /**
   * Функция, для обновления положения поппера,
   * Помогает корректно отображать выпадающий список, например,
   * когда меняется количество найденных опций
   */
  scheduleUpdate: () => void;
  /**
   * Сеттер для "optionHoverIndex"
   */
  onSetOptionHoverIndex: (index: number) => void;
  /**
   * Коллбек, выполняемый при выборе опции
   */
  onChange: (options: Option) => void;
  /**
   * Коллбек, выполняемый при скролле выпадающего списка
   */
  onScrollOptionList?: (event: SyntheticEvent<HTMLDivElement>) => void;

  /**
   * Коллбек для получения id опций, используется при проставлении React key
   * и сравнения опций (выбрана ли текущая опция)
   */
  getOptionId?: (o?: Option) => IdType;
  /**
   * Коллбек для получения имени опции
   */
  getOptionName?: (o?: Option) => string;
  /**
   * Компонент для кастомной отрисовки опций
   */
  CustomOptionComponent?: ComponentType<IOptionProps<Option>>;
}

export const OptionsScrollBlock = <T extends IBaseOptionType>({
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

      return <OptionMemo key={key} {...generalOptionProps} />;
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
