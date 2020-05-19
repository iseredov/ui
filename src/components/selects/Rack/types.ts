import { ReactNode } from 'react';
import { ISelectClassNames } from '../BaseSelect/types';

export interface IRackItemProps<Option> {
  value: Option;
  index: number;
  isReadOnly: boolean;
  onDelete: () => void;
  onEdit: () => void;
  onGetUp: () => void;
  onGetDown: () => void;
}

export interface IBaseSelectProps<Option> {
  isOpen: boolean;
  classNames?: ISelectClassNames;
  dataName?: string;
  onChange: (option?: Option) => void;
  setOpen: (isOpen: boolean) => void;
  getOptionId?: (option?: Option) => IdType;
  filterOptions?: (option: Option) => boolean;
}

export type IGeneralBaseRackProps<
  Option,
  SelectedOption extends Partial<Option>,
  SelectProps extends IBaseSelectProps<Option>
> = Omit<SelectProps, 'classNames' | 'onChange' | 'getOptionId'> & {
  /**
   * Кастомные класснеймы различных частей
   */
  classNames?: {
    rack?: {
      wrapper?: string;
      rowTop?: string;
      title?: string;
      optionsWrapper?: string;
    } & ISelectClassNames;
  };
  /**
   * Имя data-test атрибута
   */
  dataName?: string;
  /**
   * Открыт/закрыт выпадающий список
   */
  isOpen: boolean;
  /**
   * Заголовок
   */
  title: string;
  /**
   * Текст ошибки или флаг
   */
  error?: string | boolean;
  /**
   * Заблокирован/разблокирован
   */
  isDisabled?: boolean;
  /**
   * Рендерится ли блок с опциями и кнопкой добавления (замены)
   */
  isReadOnly?: boolean;
  /**
   * Открыть/закрыть выпадающий список
   */
  setOpen: (isOpen: boolean) => void;
  /**
   * Коллбек, выполняемый при выборе опции
   */
  onPickOption?: (pickedOption: Option) => void;
  /**
   * Функция для конвертации выбранной из выпадающего списка опции в тип "выбранной" опции
   * Нужна в случае, когда тип опции из справочника отличается от типа "выбранной" опции
   * По умолчанию подразумевается, что Option === SelectedOption, поэтому используется identity функция: Option => Option
   */
  convertToSelectedOption?: (pickedOption: Option) => SelectedOption;
  /**
   * Получить кастомное название для кнопки добавления (замены)
   */
  getButtonName?: (options: {
    isMulti: boolean;
    hasSelectedOptions: boolean;
  }) => string;
  /**
   * Коллбек для получения id опций, используется при проставлении React key
   * и сравнения опций (выбрана ли текущая опция)
   */
  getOptionId?: (option?: SelectedOption | Option) => IdType;
  /**
   * Коллбек выполняемый, при редактировании опции
   */
  onEdit?: (editedOption: SelectedOption) => void;
  /**
   * Кастомный компонент, который отображается до списка выбранных опций
   */
  rackHeader?: ReactNode;
  /**
   * Кастомный компонент выбранной опции
   */
  Item: (props: IRackItemProps<SelectedOption>) => JSX.Element;
  /**
   * Кастомный компонент, который отображается после списка выбранных опций
   */
  rackFooter?: ReactNode;
  /**
   * Кастомный компонент селекта
   */
  CustomSelect: (props: SelectProps) => JSX.Element;
};

export type IBaseRackProps<
  Option,
  SelectedOption extends Partial<Option>,
  SelectProps extends IBaseSelectProps<Option>
> = IGeneralBaseRackProps<Option, SelectedOption, SelectProps> & {
  /**
   * Выбранные опции
   */
  selectedOptions: SelectedOption[];
  /**
   * Убрать/оставить выбранные опции в выпадающем списке
   */
  isDeleteSelectedFromOptionList?: boolean;
  /**
   * Одиночный или множественный выбор опций
   */
  isMulti?: boolean;
  /**
   * Флаг на ограничение добавления опций
   * Работает только при isMulti=true
   */
  isLimitSelectedOptions?: boolean;
  /**
   * Коллбек при изменении списка выбранных опций (добавление, удаление, перемещение)
   */
  onChange?: (options: SelectedOption[]) => void;
  /**
   * Предикат для фильтрации загруженных опций
   */
  filterOptions?: (option: Option) => boolean;
};
