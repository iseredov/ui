import React, { useState, useCallback } from 'react';
import { action } from '@storybook/addon-actions';
import * as knobs from '@storybook/addon-knobs';

import { Suggester } from './Suggester';
import { selectSize, mockLoadOptions } from './helpers/storyHelpers';
import { Grid3x3 } from '../../storybook/Grid3x3';
import { SelectSize } from './types';

const loadData = mockLoadOptions();

export default {
  title: 'Cargomart/Select/Suggester',
  decorators: [knobs.withKnobs],
  parameters: {
    component: Suggester,
  },
};

export const WithKnobs = () => {
  const [value, setValue] = useState('');

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

  // TODO: Пока не реализовано
  // const mobileName = knobs.text(
  //   'Название справочника, которое указывается в хедере мобильной версии (mobileName)',
  //   'Мобильный справочник',
  //   textGroupId
  // );
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
  const noOptionsMessage = knobs.text(
    'Сообщение, когда нет опций (noOptionsMessage)',
    'Значений нет в справочнике',
    textGroupId
  );

  const size = knobs.select<SelectSize>('size', selectSize, 'sm', sizeGroupId);
  const maxOptionListWidth = knobs.number(
    'Максимальная ширина выпадающего списка в пикселях (maxOptionListWidth)',
    //@ts-ignore
    undefined,
    undefined,
    sizeGroupId
  );
  const minOptionListWidth = knobs.number(
    'Минимальная ширина выпадающего списка в пикселях (minOptionListWidth)',
    //@ts-ignore
    undefined,
    undefined,
    sizeGroupId
  );

  const onChange = useCallback(option => {
    action('onChange')(option);
    setValue(option);
  }, []);

  return (
    <Grid3x3>
      <Suggester
        size={size}
        value={value}
        loadOptions={loadData}
        maxOptionListWidth={maxOptionListWidth}
        minOptionListWidth={minOptionListWidth}
        error={error}
        placeholder={placeholder}
        noOptionsMessage={noOptionsMessage}
        hasDropDownIcon={hasDropDownIcon}
        hasAutoOptionListWidth={hasAutoOptionListWidth}
        isClearable={isClearable}
        isDisabled={isDisabled}
        onChange={onChange}
      />
    </Grid3x3>
  );
};
