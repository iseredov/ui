import { SyntheticEvent, ReactNode } from 'react';
import {
  IBaseSelectClassNames,
  IOptionClassNames,
  IOptionListProps,
} from './Options';

export type SelectPosition =
  | 'left'
  | 'middle'
  | 'right'
  | 'top'
  | 'bottom'
  | 'topLeft'
  | 'topRight'
  | 'topMiddle'
  | 'topMight'
  | 'middleLeft'
  | 'middleMiddle'
  | 'middleRight'
  | 'bottomLeft'
  | 'bottomMiddle'
  | 'bottomRight';

export type SelectSize = 'sm' | 'nm' | 'lg';

export interface ISelectClassNames {
  select?: IBaseSelectClassNames;
  option?: IOptionClassNames;
}

export interface IIconProps {
  className?: string;
  size: SelectSize;
}

export interface IGeneralSelectProps<Option>
  extends Omit<
    IOptionListProps<Option>,
    | 'classNames'
    | 'selectWidth'
    | 'optionHoverIndex'
    | 'hoverOptionRef'
    | 'scheduleUpdate'
    | 'onSetOptionHoverIndex'
    | 'onSetOptionHoverIndex'
    | 'onCloseMenu'
  > {
  /**
   * Имя поля, предназначено для того, чтобы обработчик формы мог его идентифицировать
   * Тестовый атрибут для cypress тестов
   */
  dataName?: string;
  /**
   * html атрибут для навигации через tab
   */
  tabIndex?: number;
  /**
   * Конфиг с именами классов для внутренних частей селекта
   */
  classNames?: ISelectClassNames;
  /**
   * Размер (высота) селекта sm, nm, lg
   */
  size?: SelectSize;
  /**
   * Позиция селекта, необходима для закругления
   * определенных границ в зависимости от позиции
   */
  position?: SelectPosition;
  /**
   * placeholder для селекта
   */
  placeholder?: string;
  /**
   * Флаг наличия ошибки (или её текст)
   * Если текст, то будет выведена иконка ошибки, а на ней тултип с текстом ошибки
   */
  error?: boolean | string;
  /**
   * Заблокирован/разблокирован селект
   */
  isDisabled?: boolean;
  /**
   * Наличие иконки стрелочка вниз (вверх)
   */
  hasDropDownIcon?: boolean;
  /**
   * Коллбек, выполняемый при фокусе выпадающего списка
   */
  onFocus?: (event?: SyntheticEvent<HTMLElement>) => void;
  /**
   * Коллбек, выполняемый при блюре (закрытии) выпадающего списка
   */
  onBlur?: (event?: SyntheticEvent<HTMLElement>) => void;
  /**
   * Элемент для кастомной отрисовки поля выбранной опции
   */
  customSelectInput?: ReactNode;
  /**
   * Иконка перед полем ввода
   * Корректно будет позиционироваться только при размерах 24*24 px (size="nm")
   */
  IconBeforeSelectInput?: (props: IIconProps) => JSX.Element;
}

export interface IBaseSelectProps<Option> extends IGeneralSelectProps<Option> {
  /**
   * Открыт/закрыт выпадающий список
   */
  isOpen: boolean;
  /**
   * Коллбек, выполняемый при отрытии выпадающего списка
   */
  onSetOpen: (isOpen: boolean) => void;
}
