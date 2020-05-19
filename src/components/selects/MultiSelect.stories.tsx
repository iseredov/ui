import React, { useState, useCallback } from 'react';
import noop from 'lodash/noop';
import { action } from '@storybook/addon-actions';
import * as knobs from '@storybook/addon-knobs';
import { Grid3x3 } from '../../storybook/Grid3x3';

import { MultiSelect } from './MultiSelect';
import { defaultOptionList, selectSize } from './helpers/storyHelpers';
import { SelectSize } from './types';

export default {
  title: 'Cargomart/Select/MultiSelect',
  decorators: [knobs.withKnobs],
  parameters: {
    component: MultiSelect,
  },
};

export const WithKnobs = () => {
  const [selectedOptions, setSelectedOptions] = useState([
    defaultOptionList[0],
    defaultOptionList[3],
  ]);

  const flagGroupId = 'Флаги';
  const textGroupId = 'Текстовки';
  const sizeGroupId = 'Размеры';

  const isClearable = knobs.boolean(
    'Возможность удалить выбранную опцию (isClearable)',
    false,
    flagGroupId
  );
  const isDisabled = knobs.boolean(
    'Заблокирован/разблокирован (isDisabled)',
    false,
    flagGroupId
  );
  const isLoading = knobs.boolean(
    'Наличие индикатора загрузки (isLoading)',
    false,
    flagGroupId
  );
  const hasDropDownIcon = knobs.boolean(
    'Наличие стрелочки вниз/вверх (hasDropDownIcon)',
    true,
    flagGroupId
  );
  const hasAutoOptionListWidth = knobs.boolean(
    'Выпадающий список принимает длину самой длинной опции (hasAutoOptionListWidth)',
    false,
    flagGroupId
  );

  const mobileName = knobs.text(
    'Название справочника, которое указывается в хедере мобильной версии (mobileName)',
    'Мобильный справочник',
    textGroupId
  );
  const placeholder = knobs.text(
    'placeholder',
    'Начните что-то вводить',
    textGroupId
  );
  const error = knobs.text(
    'Текст ошибки (при пустой строке ошибки нет) (error)',
    '',
    textGroupId
  );

  const size = knobs.select<SelectSize>('size', selectSize, 'sm', sizeGroupId);
  const maxOptionListWidth = knobs.number(
    'Максимальная ширина выпадающего списка в пикселях (maxOptionListWidth)',
    undefined,
    undefined,
    sizeGroupId
  );
  const minOptionListWidth = knobs.number(
    'Минимальная ширина выпадающего списка в пикселях (minOptionListWidth)',
    undefined,
    undefined,
    sizeGroupId
  );

  const onChange = useCallback(options => {
    action('onChange')(options);
    setSelectedOptions(options);
  }, []);

  return (
    <Grid3x3>
      <MultiSelect
        mobileName={mobileName}
        placeholder={placeholder}
        hasAutoOptionListWidth={hasAutoOptionListWidth}
        maxOptionListWidth={maxOptionListWidth}
        minOptionListWidth={minOptionListWidth}
        size={size}
        selectedOptions={selectedOptions}
        options={defaultOptionList}
        error={error}
        isClearable={isClearable}
        isDisabled={isDisabled}
        isLoading={isLoading}
        hasDropDownIcon={hasDropDownIcon}
        onChange={onChange}
      />
    </Grid3x3>
  );
};

export const NoOptions = () => {
  const value = [{ id: 1, name: 'Что-то выбрано' }];
  const noOptionsMessage = knobs.text(
    'Сообщение, когда нет опций (noOptionsMessage)',
    'Но опций нет, например, отвалился бекэнд'
  );

  return (
    <Grid3x3>
      <MultiSelect
        mobileName="Простой справочник"
        noOptionsMessage={noOptionsMessage}
        selectedOptions={value}
        options={[]}
        onChange={noop}
      />
    </Grid3x3>
  );
};
