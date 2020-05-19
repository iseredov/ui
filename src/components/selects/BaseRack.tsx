import React, { useCallback, useMemo, ReactNode, ComponentType } from 'react';
import cn from 'classnames/bind';
import keyBy from 'lodash/keyBy';
import noop from 'lodash/noop';

import { IconError } from '../icons/IconError';
import { Tooltip } from '../Tooltip';

import { defaultGetOptionId } from './helpers/defaultValues';
import { areOptionsEqual } from './helpers/areOptionsEqual';
import { IBaseOptionType, ISelectClassNames } from './types';
import { RackButton } from './RackButton';
import { RackItem } from './RackItem';

import style from './BaseRack.module.scss';

const cx = cn.bind(style);

export const BaseRack = <
  Option extends IBaseOptionType,
  SelectedOption extends Partial<Option>,
  SelectProps extends IBaseSelectProps<Option>
>({
  dataName,
  classNames = {},
  selectedOptions,
  title,
  error = '',
  isOpen,
  isDeleteSelectedFromOptionList = false,
  isMulti = false,
  isLimitSelectedOptions = false,
  isReadOnly = false,
  isDisabled,
  setOpen,
  // @ts-ignore
  convertToSelectedOption = (option: Option) => option,
  onPickOption = noop,
  onChange = noop,
  onEdit = noop,
  getOptionId = defaultGetOptionId,
  getButtonName,
  filterOptions,
  rackHeader,
  Item,
  rackFooter,
  CustomSelect,
  ...props
}: IBaseRackProps<Option, SelectedOption, SelectProps>) => {
  const { rack: rackCn = {}, ...selectClassNames } = classNames;

  const selectedOptionsHashMap = useMemo(
    //@ts-ignore
    () => keyBy<SelectedOption>(selectedOptions, getOptionId),
    [selectedOptions, getOptionId]
  );

  const handleSelectOpen = useCallback(() => setOpen(true), [setOpen]);

  const swapOptions = useCallback(
    (firstIndex: number, secondIndex: number) => {
      const copySelectedOptions = [...selectedOptions];
      const firstOption = copySelectedOptions[firstIndex];
      const secondOption = copySelectedOptions[secondIndex];
      copySelectedOptions[firstIndex] = secondOption;
      copySelectedOptions[secondIndex] = firstOption;
      return copySelectedOptions;
    },
    [selectedOptions]
  );

  const handleGetUpOption = useCallback(
    (currentIndex: number) => {
      if (currentIndex !== 0) {
        onChange(swapOptions(currentIndex, currentIndex - 1));
      }
    },
    [swapOptions, onChange]
  );

  const handleGetDownOption = useCallback(
    (currentIndex: number) => {
      if (currentIndex !== selectedOptions.length - 1) {
        onChange(swapOptions(currentIndex, currentIndex + 1));
      }
    },
    [swapOptions, selectedOptions.length, onChange]
  );

  const handlePickOption = useCallback(
    (option: Option) => {
      const hasInSelectedOptions = Boolean(
        selectedOptionsHashMap[getOptionId(option)]
      );

      if (!hasInSelectedOptions) {
        const selectedOption = convertToSelectedOption(option);
        onPickOption(option);
        onChange(
          isMulti ? [...selectedOptions, selectedOption] : [selectedOption]
        );
      }
    },
    [
      isMulti,
      selectedOptions,
      selectedOptionsHashMap,
      onChange,
      getOptionId,
      convertToSelectedOption,
      onPickOption,
    ]
  );

  const handleChangeInSelect = useCallback(
    (option?: Option) => {
      if (option) {
        handlePickOption(option);
      }
    },
    [handlePickOption]
  );

  const handleDeleteSelectedOption = useCallback(
    (deletedOption: SelectedOption) => {
      const filteredOptions = selectedOptions.filter(
        selectedOption =>
          !areOptionsEqual(getOptionId, deletedOption, selectedOption)
      );
      onChange(filteredOptions);
    },
    [selectedOptions, onChange, getOptionId]
  );

  const filterSelectedOptions = useCallback(
    (option: Option) => !selectedOptionsHashMap[getOptionId(option)],
    [selectedOptionsHashMap, getOptionId]
  );

  const hasSelectedOptions = selectedOptions.length > 0;

  const customFilterOptions = useMemo(() => {
    if (filterOptions) {
      return filterOptions;
    }

    return isDeleteSelectedFromOptionList ? filterSelectedOptions : undefined;
  }, [isDeleteSelectedFromOptionList, filterOptions, filterSelectedOptions]);

  const canAddItem = !isReadOnly && !isLimitSelectedOptions;

  return (
    <div
      data-name={dataName}
      data-error={error || undefined}
      className={cx('wrapper', { wrapper_error: error }, rackCn.wrapper)}
    >
      <div className={cx('curtainWrapper')}>
        <div className={cx({ curtain: isOpen })} />
        <div className={cx('row', 'row_top', rackCn.rowTop)}>
          <h2 className={cx('title', rackCn.title)}>{title}</h2>
          {error &&
            (typeof error === 'string' ? (
              <Tooltip content={error}>
                <IconError className={cx('iconError')} />
              </Tooltip>
            ) : (
              <IconError className={cx('iconError')} />
            ))}
        </div>

        {rackHeader}

        {hasSelectedOptions && (
          <div className={cx('optionsWrapper', rackCn.optionsWrapper)}>
            {selectedOptions.map((selectedOption, index) => (
              <RackItem
                key={String(getOptionId(selectedOption))}
                value={selectedOption}
                index={index}
                isReadOnly={isReadOnly}
                onEdit={onEdit}
                onDelete={handleDeleteSelectedOption}
                onGetUp={handleGetUpOption}
                onGetDown={handleGetDownOption}
                Item={Item}
              />
            ))}
          </div>
        )}

        {rackFooter}
      </div>

      {!isOpen && canAddItem && (
        <RackButton
          dataName={dataName}
          isDisabled={isDisabled}
          isMulti={isMulti}
          hasSelectedOptions={hasSelectedOptions}
          getButtonName={getButtonName}
          onClick={handleSelectOpen}
        />
      )}

      <CustomSelect
        {...(props as any)}
        dataName={dataName ? `select_${dataName}` : undefined}
        classNames={selectClassNames}
        isOpen={isOpen}
        onChange={handleChangeInSelect}
        setOpen={setOpen}
        getOptionId={getOptionId}
        filterOptions={customFilterOptions}
      />
    </div>
  );
};

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
  Item: ComponentType<IRackItemProps<SelectedOption>>;
  /**
   * Кастомный компонент, который отображается после списка выбранных опций
   */
  rackFooter?: ReactNode;
  /**
   * Кастомный компонент селекта
   */
  CustomSelect: ComponentType<SelectProps>;
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
