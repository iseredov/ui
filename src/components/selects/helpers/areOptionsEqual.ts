import { IBaseOptionType } from '../types';

type IGetOptionId<Option extends IBaseOptionType> = (option?: Option) => IdType;

export const areOptionsEqual = <Option extends IBaseOptionType>(
  getOptionId: IGetOptionId<Option>,
  currentOption?: Option,
  selectedOption?: Option
) => getOptionId(currentOption) === getOptionId(selectedOption);
