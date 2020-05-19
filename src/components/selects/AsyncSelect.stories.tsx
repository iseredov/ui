import React, { useState, useCallback } from 'react';
import { action } from '@storybook/addon-actions';
import * as knobs from '@storybook/addon-knobs';

import { AsyncSelect } from './AsyncSelect';
import {
  selectSize,
  defaultOptionList,
  mockLoadOptions,
} from './helpers/storyHelpers';

import { Grid3x3 } from '../../storybook/Grid3x3';
import { WidthWrapper } from '../../storybook/WidthWrapper';
import { SelectSize } from './types';

const optionList = Array(...new Array(100)).map((_: number, index: number) => ({
  id: index + 1,
  name: `Test__${index + 1}`,
}));

const loadData = mockLoadOptions(optionList);

export default {
  title: 'Cargomart/Select/AsyncSelect',
  decorators: [knobs.withKnobs],
  parameters: {
    component: AsyncSelect,
  },
};

export const WithKnobs = () => {
  const [value, setValue] = useState(defaultOptionList[1]);

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
  const hasInfinityScroll = knobs.boolean(
    'Вкл/выкл бесконечной прокрутки, при скролле происходит дозагрузка опций (hasInfinityScroll)',
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
  const loadingMessage = knobs.text(
    'Сообщение, когда идёт загрузка (loadingMessage)',
    'Идёт загрузка',
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

  const onChange = useCallback(option => {
    action('onChange')(option);
    setValue(option);
  }, []);
  const onChangeSearchValue = action('onChangeSearchValue');

  return (
    <Grid3x3>
      <WidthWrapper>
        <AsyncSelect
          mobileName={mobileName}
          size={size}
          selectedOptionData={value}
          loadOptions={loadData}
          hasAutoOptionListWidth={hasAutoOptionListWidth}
          maxOptionListWidth={maxOptionListWidth}
          minOptionListWidth={minOptionListWidth}
          error={error}
          loadingMessage={loadingMessage}
          noOptionsMessage={noOptionsMessage}
          placeholder={placeholder}
          isClearable={isClearable}
          isDisabled={isDisabled}
          hasInfinityScroll={hasInfinityScroll}
          hasDropDownIcon={hasDropDownIcon}
          onChange={onChange}
          onChangeSearchValue={onChangeSearchValue}
        />
      </WidthWrapper>
    </Grid3x3>
  );
};
