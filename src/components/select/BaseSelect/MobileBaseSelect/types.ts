import { SyntheticEvent } from 'react';
import { IMobileViewProps, IOptionProps } from '../Options';
import { IdType } from 'global';

export interface IMobileBaseSelectProps<Option> extends IMobileViewProps {
  /**
   * Название селекта (выводится в шапке модалки)
   */
  name: string;
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
  CustomOptionComponent?: (props: IOptionProps<Option>) => JSX.Element;
}
