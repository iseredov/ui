import get from 'lodash/get';

import { IBaseOptionType } from '../types';

export const defaultGetOptionId = (option?: IBaseOptionType) =>
  get(option, 'id', '');
export const defaultGetOptionName = (option?: IBaseOptionType) =>
  get(option, 'name', '');
export const defaultLoadingMessage = `Загрузка...`;
export const defaultNoOptionsMessage = `Значения нет в справочнике. Возможно, вы ошиблись в написании.`;
