import { IGeneralSelectProps, ISelectClassNames } from '../BaseSelect/types';
import { ILoadOptionParams, ILoadOptionsData } from './hooks/useSearchLoadData';

export interface IGeneralAsyncSelectProps<Option>
  extends Omit<
    IGeneralSelectProps<Option>,
    | 'options'
    | 'isLoading'
    | 'value'
    | 'isMobile'
    | 'onChange'
    | 'hasClearIcon'
    | 'onClear'
  > {
  classNames?: {
    selectInputClassName?: string;
  } & ISelectClassNames;
  /**
   * Функция для запроса данных об опциях
   */
  loadOptions: (
    loadOptionsParams: ILoadOptionParams
  ) => Promise<ILoadOptionsData<Option>>;
  /**
   * Коллбек, выполняемый при смене опции
   */
  onChange: (option?: Option) => void;
  /**
   * Предикат для фильтрации загруженных опций
   */
  filterOptions?: (option: Option) => boolean;
  /**
   * Коллбек, выполняемый при изменении строки поиска
   */
  onChangeSearchValue?: (searchValue: string) => void;
  /**
   * Флаг, позволяющий искуственно добавить выбранную опцию к списку опций
   */
  alwaysAddSelectedOption?: boolean;
  /**
   * Наличие/отсутсвие дозагрузки опции при скролле
   */
  hasInfinityScroll?: boolean;
  /**
   * Флаг для перезагрузки опций, при выставлении в true перезапрашивает данные
   */
  needReload?: boolean;
  /**
   * Наличие/отсутсвие иконки очистки
   */
  isClearable?: boolean;
}

export interface IBaseAsyncSelectProps<Option>
  extends IGeneralAsyncSelectProps<Option> {
  /**
   * Информация по выбранной опции
   */
  selectedOptionData?: Partial<Option>;
  /**
   * Открыт/закрыт выпадающий список
   */
  isOpen: boolean;
  /**
   * Флаг мобильного разрешения
   */
  isMobile?: boolean;
  /**
   * Сеттер установки флага isOpen
   */
  setOpen: (isOpen: boolean) => void;
}

export interface IAsyncSelectProps<Option>
  extends Omit<
    IGeneralAsyncSelectProps<Option>,
    | 'mobileBeforeHeader'
    | 'mobileAfterHeader'
    | 'mobileOptionListHeader'
    | 'mobileOptionListFooter'
  > {
  /**
   * Информация по выбранной опции
   */
  selectedOptionData?: Partial<Option>;
  /**
   * Начальное состояние открыт/закрыт выпадающий список
   */
  isInitialOpen?: boolean;
}
