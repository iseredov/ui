import React, { useCallback, useState } from 'react';
import noop from 'lodash/noop';
import { action } from '@storybook/addon-actions';
import {
  withKnobs,
  select,
  number,
  boolean,
  text,
} from '@storybook/addon-knobs';

import { defaultOptionList, selectSize } from './helpers/storyHelpers';
import { Grid3x3 } from '../../storybook/Grid3x3';

import { SingleSelect } from './SingleSelect';
import { SelectSize } from './types';

export default {
  title: 'Cargomart/Select/SingleSelect',
  decorators: [withKnobs],
  parameters: {
    component: SingleSelect,
  },
};

export const WithKnobs = () => {
  const [selectedValue, setSelectedValue] = useState(defaultOptionList[1]);

  const flagGroupId = 'Флаги';
  const textGroupId = 'Текстовки';
  const sizeGroupId = 'Размеры';

  const isClearable = boolean(
    'Возможность удалить выбранную опцию (isClearable)',
    false,
    flagGroupId
  );
  const isDisabled = boolean(
    'Заблокирован/разблокирован (isDisabled)',
    false,
    flagGroupId
  );
  const isLoading = boolean(
    'Наличие индикатора загрузки (isLoading)',
    false,
    flagGroupId
  );
  const hasDropDownIcon = boolean(
    'Наличие стрелочки вниз/вверх (hasDropDownIcon)',
    true,
    flagGroupId
  );
  const hasAutoOptionListWidth = boolean(
    'Выпадающий список принимает длину самой длинной опции (hasAutoOptionListWidth)',
    false,
    flagGroupId
  );

  const mobileName = text(
    'Название справочника, которое указывается в хедере мобильной версии (mobileName)',
    'Мобильный справочник',
    textGroupId
  );
  const placeholder = text(
    'placeholder',
    'Начните что-то вводить',
    textGroupId
  );
  const error = text(
    'Текст ошибки (при пустой строке ошибки нет) (error)',
    '',
    textGroupId
  );

  const size = select<SelectSize>('size', selectSize, 'sm', sizeGroupId);
  const maxOptionListWidth = number(
    'Максимальная ширина выпадающего списка в пикселях (maxOptionListWidth)',
    undefined,
    undefined,
    sizeGroupId
  );
  const minOptionListWidth = number(
    'Минимальная ширина выпадающего списка в пикселях (minOptionListWidth)',
    undefined,
    undefined,
    sizeGroupId
  );

  const onChange = useCallback(option => {
    action('onChange')(option);
    setSelectedValue(option);
  }, []);

  return (
    <Grid3x3>
      <SingleSelect
        mobileName={mobileName}
        placeholder={placeholder}
        hasAutoOptionListWidth={hasAutoOptionListWidth}
        maxOptionListWidth={maxOptionListWidth}
        minOptionListWidth={minOptionListWidth}
        size={size}
        value={selectedValue}
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
  const value = { id: 1, name: 'Что-то выбрано' };
  const noOptionsMessage = text(
    'Сообщение, когда нет опций (noOptionsMessage)',
    'Но опций нет, например, отвалился бекэнд'
  );

  return (
    <Grid3x3>
      <SingleSelect
        mobileName="Простой справочник"
        noOptionsMessage={noOptionsMessage}
        value={value}
        options={[]}
        onChange={noop}
      />
    </Grid3x3>
  );
};
