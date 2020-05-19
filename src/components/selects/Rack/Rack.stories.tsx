import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import * as knobs from '@storybook/addon-knobs';

import { Rack, IRackProps } from './Rack';
import { CustomItem } from './storyhelper';
import { IOption, defaultOptionList } from '../helpers/storyHelpers';
import { Grid3x3 } from '../../../storybook/Grid3x3';
import { WidthWrapper } from '../../../storybook/WidthWrapper';

export default {
  title: 'Cargomart/Select/Rack',
  decorators: [knobs.withKnobs],
  parameters: {
    component: Rack,
  },
};

interface IProps
  extends Omit<
    IRackProps<IOption, IOption>,
    'isOpen' | 'setOpen' | 'selectedOptions'
  > {
  limitSelectedOptions?: number;
}

const CustomRack = ({ limitSelectedOptions, ...props }: IProps) => {
  const [selectedOptions, setSelectedOptions] = useState([
    defaultOptionList[0],
  ]);
  const [isOpen, setOpen] = useState(false);

  const onChange = options => {
    action('onChange')(options);
    setSelectedOptions(options);
  };

  const isLimitSelectedOptions =
    limitSelectedOptions !== undefined
      ? limitSelectedOptions <= selectedOptions.length
      : false;

  return (
    <WidthWrapper>
      <Rack
        {...props}
        selectedOptions={selectedOptions}
        isReadOnly={
          props.isReadOnly &&
          !(selectedOptions.length === defaultOptionList.length)
        }
        isLimitSelectedOptions={isLimitSelectedOptions}
        isOpen={isOpen}
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
      <CustomRack
        options={defaultOptionList}
        title={title}
        error={error}
        limitSelectedOptions={limitSelectedOptions}
        minOptionListWidth={minOptionListWidth}
        maxOptionListWidth={maxOptionListWidth}
        isDeleteSelectedFromOptionList={isDeleteSelectedFromOptionList}
        isReadOnly={isReadOnly}
        isMulti={isMulti}
        isDisabled={isDisabled}
        hasDropDownIcon={hasDropDownIcon}
        Item={CustomItem}
      />
    </Grid3x3>
  );
};

export const SignleChoice = () => {
  return (
    <Grid3x3>
      <CustomRack
        title="Test"
        options={defaultOptionList}
        Item={CustomItem}
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
      <CustomRack
        title="Test"
        options={defaultOptionList}
        Item={CustomItem}
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
      <CustomRack
        title="Test"
        options={defaultOptionList}
        Item={CustomItem}
        limitSelectedOptions={defaultOptionList.length}
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
      <CustomRack
        title="Test"
        options={defaultOptionList}
        Item={CustomItem}
        limitSelectedOptions={limitSelectedOptions}
        isDeleteSelectedFromOptionList={false}
        isMulti
      />
    </Grid3x3>
  );
};
