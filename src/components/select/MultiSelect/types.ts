import { IGeneralSelectProps } from '../BaseSelect/types';

export interface IBaseMultiSelectProps<Option>
  extends Omit<
    IGeneralSelectProps<Option>,
    'value' | 'hasClearIcon' | 'onClear'
  > {
  isOpen: boolean;
  isMobile?: boolean;
  /**
   * Массив выбранных опций
   */
  selectedOptions: Option[];
  /**
   * Наличие возможности сбросить выбранные опции
   */
  isClearable?: boolean;
  /**
   * Начальное состояние (открыт/закрыт) выпадающий список
   */
  isInitialOpen?: boolean;
  /**
   * Коллбек, выполняемый при выборе опции
   */
  onChange: (options: Option[]) => void;
  onSetOpen: (isOpen: boolean) => void;
}

export interface IMultiSelectProps<Option>
  extends Omit<
    IBaseMultiSelectProps<Option>,
    | 'isOpen'
    | 'isMobile'
    | 'onSetOpen'
    | 'mobileBeforeHeader'
    | 'mobileAfterHeader'
    | 'mobileOptionListHeader'
    | 'mobileOptionListFooter'
  > {}
