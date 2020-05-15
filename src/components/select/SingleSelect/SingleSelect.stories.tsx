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
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import { Grid3x3 } from '../../../storybook/Grid3x3';

import { Select } from './SingleSelect';

enum SIZE {
  SM = 'sm',
  NM = 'nm',
  LG = 'lg',
}

const defaultOptionList = [
  { id: 1, name: 'Маленькая опция' },
  { id: 2, name: 'Опция чуть большей длины' },
  {
    id: 3,
    name:
      'Супер мега длинная опция, чтобы проверить корректность её отображения',
  },
  { id: 4, name: 'Опция тест_1' },
  { id: 5, name: 'Скромная опция' },
  { id: 8, name: 'Опция тест_2' },
];

export default {
  title: 'Cargomart/Select/SingleSelect',
  decorators: [withKnobs],
  parameters: {
    component: Select,
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

  const size = select('size', SIZE, SIZE.SM, sizeGroupId);
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
      <Select
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

// storiesOf('Single Select', module)
//   .addDecorator(withKnobs)
//   .addDecorator(withInfo)
//   .add('knobs', () => {})
//   .add('No options', () => {
//     const value = { id: 1, name: 'Что-то выбрано' };
//     const noOptionsMessage = text(
//       'Сообщение, когда нет опций (noOptionsMessage)',
//       'Но опций нет, например, отвалился бекэнд'
//     );

//     return (
//       <Grid3x3>
//         <Select
//           mobileName="Простой справочник"
//           noOptionsMessage={noOptionsMessage}
//           value={value}
//           options={[]}
//           onChange={noop}
//         />
//       </Grid3x3>
//     );
//   });
