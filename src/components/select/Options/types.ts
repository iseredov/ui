import { SyntheticEvent, Ref, ReactNode } from 'react';

export type IGetOptionKey<Option> = (o?: Option) => IdType;
export type IGetOptionName<Option> = (o?: Option) => string;

export interface IGetOptionHandlers<Option> {
  /**
   * Коллбек для получения id опций, используется при проставлении React key
   * и сравнения опций (выбрана ли текущая опция)
   */
  getOptionId?: IGetOptionKey<Option>;
  /**
   * Коллбек для получения имени опции
   */
  getOptionName?: IGetOptionName<Option>;
}

export interface IBaseOption {
  id?: IdType;
  name?: string;
}

export interface IOptionProps<Option extends IBaseOption> {
  hoverOptionRef?: Ref<HTMLLIElement>;
  className?: string;
  value: Option;
  name: string;
  index?: number;
  selectWidth: number;
  isMobile: boolean;
  isSelected?: boolean;
  isHovered?: boolean;
  onClick?: (option: Option) => void;
  onSetOptionHoverIndex?: (index: number) => void;
}

export type ICustomOption<Option extends IBaseOption> = (
  props: IOptionProps<Option>
) => JSX.Element;

export interface IOptionClassNames {
  noOptionMessageText?: string;
  optionList?: string;
  optionListWrapper?: string;
  option?: string;
}

export interface IBaseSelectClassNames {
  wrapper?: string;
  innerWrapper?: string;
  selectInputWrapper?: string;
  iconsWrapper?: string;
  selectText?: string;
  selectPlaceholder?: string;
}

export interface IMobileViewProps {
  mobileBeforeHeader?: ReactNode;
  mobileAfterHeader?: ReactNode;
  mobileOptionListHeader?: ReactNode;
  mobileOptionListFooter?: ReactNode;
}

export interface IOptionsScrollBlockProps<Option>
  extends IGetOptionHandlers<Option> {
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
   * Компонент для кастомной отрисовки опций
   */
  CustomOptionComponent?: ICustomOption<Option>;
}

export interface IOptionListProps<Option>
  extends Omit<
      IOptionsScrollBlockProps<Option>,
      'hoverOptionRef' | 'scheduleUpdate' | 'onChange'
    >,
    IMobileViewProps {
  /**
   * Имя селекта, отображаемое в шапке мобильного вида
   */
  mobileName: string;
  /**
   * Наличие иконки очистки
   */
  hasClearIcon: boolean;
  /**
   * Коллбек, выполняемый при выборе опции
   */
  onChange: (options: Option[]) => void;
  /**
   * Коллбек, выполняемый при нажатие иконки очистки
   */
  onClear: (event: SyntheticEvent<Element>) => void;
  /**
   * Коллбек, выполняемый при закрытии выпадающего списка
   */
  onCloseMenu: () => void;
  /**
   * Элемент для отрисовки шапки в выпадающем списке
   */
  optionListHeader?: ReactNode;
  /**
   * Элемент для отрисовки футера в выпадающем списке
   */
  optionListFooter?: ReactNode;
}
