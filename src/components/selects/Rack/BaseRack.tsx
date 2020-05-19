import React, { useCallback, useMemo } from 'react';
import cn from 'classnames/bind';
import keyBy from 'lodash/keyBy';
import noop from 'lodash/noop';

import { IconError } from '../../icons/IconError';
import { Tooltip } from '../../Tooltip';

import { defaultGetOptionId } from '../helpers/defaultValues';
import { areOptionsEqual } from '../helpers/areOptionsEqual';
import { IBaseOption } from '../Options/types';
import { RackButton } from './RackButton';
import { RackItem } from './RackItem';
import { IBaseRackProps, IBaseSelectProps } from './types';

import style from './BaseRack.module.scss';

const cx = cn.bind(style);

export const BaseRack = <
  Option extends IBaseOption,
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
