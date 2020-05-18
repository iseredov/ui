import get from 'lodash/get';

import { IBaseOption } from '../Options/types';

export const defaultGetOptionId = (option?: IBaseOption) =>
  get(option, 'id', '');
export const defaultGetOptionName = (option?: IBaseOption) =>
  get(option, 'name', '');
export const defaultLoadingMessage = `Загрузка...`;
export const defaultNoOptionsMessage = `Значения нет в справочнике. Возможно, вы ошиблись в написании.`;
