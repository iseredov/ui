import React, { useState, useCallback } from 'react';
import { action } from '@storybook/addon-actions';
import * as knobs from '@storybook/addon-knobs';

import { AsyncRack, IAsyncRackProps } from './AsyncRack';
import { Grid3x3 } from '../../storybook/Grid3x3';
import { WidthWrapper } from '../../storybook/WidthWrapper';
import { mockLoadOptions, IOption } from './helpers/storyHelpers';
import { CustomItem } from './storyhelper';

export default {
  title: 'Cargomart/Select/AsyncRack',
  decorators: [knobs.withKnobs],
  parameters: {
    component: AsyncRack,
  },
};

const optionList = Array(...new Array(100)).map((_: number, index: number) => ({
  id: index + 1,
  name: `Test__${index + 1}`,
}));

const loadData = mockLoadOptions(optionList);

interface IProps
  extends Omit<
    IAsyncRackProps<IOption, IOption>,
    'isOpen' | 'setOpen' | 'selectedOptions' | 'Item'
  > {
  limitSelectedOptions?: number;
}

const CustomAsyncRack = ({ limitSelectedOptions, ...props }: IProps) => {
  const [selectedOptions, setSelectedOptions] = useState([optionList[0]]);
  const [isOpen, setOpen] = useState(false);

  const onChange = useCallback(options => {
    action('onChange')(options);
    setSelectedOptions(options);
  }, []);

  const isLimitSelectedOptions =
    limitSelectedOptions !== undefined
      ? limitSelectedOptions <= selectedOptions.length
      : false;

  return (
    <WidthWrapper>
      <AsyncRack
        {...props}
        selectedOptions={selectedOptions}
        isOpen={isOpen}
        isLimitSelectedOptions={isLimitSelectedOptions}
        setOpen={setOpen}
        onChange={onChange}
        Item={CustomItem}
      />
    </WidthWrapper>
  );
};

export const WithKnobs = () => {
  const flagGroupId = 'Флаги';
  const textGroupId = 'Текстовки';
  const limitationsGroupId = 'Ограничения';

  const isDeleteSelectedFromOptionList = knobs.boolean(
    'Убирать ли выбранную опцию из выпадающего списка (isDeleteSelectedFromOptionList)',
    false,
    flagGroupId
  );
  const isReadOnly = knobs.boolean(
    'Запрет редактирования (isReadOnly)',
    false,
    flagGroupId
  );
  const isMulti = knobs.boolean(
    'Возможность множественного выбора (isMulti)',
    false,
    flagGroupId
  );
  const isDisabled = knobs.boolean(
    'Заблокирован для взаимодействия (isDisabled)',
    false,
    flagGroupId
  );
  const hasDropDownIcon = knobs.boolean(
    'Наличие стрелочки вниз/вверх (hasDropDownIcon)',
    true,
    flagGroupId
  );

  const title = knobs.text('Название (title)', 'Стеллаж', textGroupId);
  const placeholder = knobs.text(
    'placeholder',
    'Начните что-то вводить',
    textGroupId
  );
  const error = knobs.text(
    'Текст ошибки или её наличие (м.б. boolean) (error)',
    '',
    textGroupId
  );

  const limitSelectedOptions = knobs.number(
    'Ограничение на кол-во выбранных опций (limitSelectedOptions)',
    4,
    undefined,
    limitationsGroupId
  );
  const minOptionListWidth = knobs.number(
    'Минимальная ширина выпадающего списка в пикселях (minOptionListWidth)',
    undefined,
    undefined,
    limitationsGroupId
  );
  const maxOptionListWidth = knobs.number(
    'Максимальная ширина выпадающего списка в пикселях (maxOptionListWidth)',
    undefined,
    undefined,
    limitationsGroupId
  );

  return (
    <Grid3x3>
      <CustomAsyncRack
        title={title}
        placeholder={placeholder}
        loadOptions={loadData}
        error={error}
        limitSelectedOptions={limitSelectedOptions}
        minOptionListWidth={minOptionListWidth}
        maxOptionListWidth={maxOptionListWidth}
        isDeleteSelectedFromOptionList={isDeleteSelectedFromOptionList}
        isReadOnly={isReadOnly}
        isMulti={isMulti}
        isDisabled={isDisabled}
        hasDropDownIcon={hasDropDownIcon}
      />
    </Grid3x3>
  );
};

export const SignleChoice = () => {
  return (
    <Grid3x3>
      <CustomAsyncRack
        title="Test"
        loadOptions={loadData}
        isMulti={false}
        isLimitSelectedOptions={false}
        isDeleteSelectedFromOptionList={false}
      />
    </Grid3x3>
  );
};

export const MultiChoice = () => {
  return (
    <Grid3x3>
      <CustomAsyncRack
        title="Test"
        loadOptions={loadData}
        isLimitSelectedOptions={false}
        isDeleteSelectedFromOptionList={false}
        isMulti
      />
    </Grid3x3>
  );
};

export const MultiChoiceWithDeleteSelectedFromOptionList = () => {
  return (
    <Grid3x3>
      <CustomAsyncRack
        title="Test"
        loadOptions={loadData}
        limitSelectedOptions={optionList.length}
        isDeleteSelectedFromOptionList
        isMulti
      />
    </Grid3x3>
  );
};

export const MultiChoiceWithLimit = () => {
  const limitSelectedOptions: number = knobs.number('limitSelectedOptions', 3);

  return (
    <Grid3x3>
      <CustomAsyncRack
        title="Test"
        loadOptions={loadData}
        limitSelectedOptions={limitSelectedOptions}
        isDeleteSelectedFromOptionList={false}
        isMulti
      />
    </Grid3x3>
  );
};
