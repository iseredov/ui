import { IGeneralSelectProps } from '../BaseSelect/types';

export interface IGeneralSingleSelectProps<Option>
  extends Omit<
    IGeneralSelectProps<Option>,
    'value' | 'isMobile' | 'onChange' | 'hasClearIcon' | 'onClear'
  > {
  /**
   * Выбранная опция
   */
  value?: Option;
  /**
   * Наличие возможности удалить выбранное значение
   */
  isClearable?: boolean;
  /**
   * Коллбек, выполняемый при выборе опции
   */
  onChange: (o?: Option) => void;
}

export interface IBaseSelectProps<Option>
  extends IGeneralSingleSelectProps<Option> {
  /**
   * Начальное состояние (открыт/закрыт) выпадающий список
   */
  isOpen: boolean;
  /**
   * Флаг мобильного разрешения
   */
  isMobile?: boolean;
  /**
   * Сеттер "isOpen"
   */
  setOpen: (isOpen: boolean) => void;
  /**
   * Предикат для фильтрации загруженных опций
   */
  filterOptions?: (option: Option) => boolean;
}

export interface ISelectProps<Option>
  extends Omit<
    IGeneralSingleSelectProps<Option>,
    | 'mobileBeforeHeader'
    | 'mobileAfterHeader'
    | 'mobileOptionListHeader'
    | 'mobileOptionListFooter'
  > {
  /**
   * Начальное состояние (открыт/закрыт) выпадающий список
   */
  isInitialOpen?: boolean;
}
