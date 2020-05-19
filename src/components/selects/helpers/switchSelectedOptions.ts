import { areOptionsEqual } from './areOptionsEqual';
import { IBaseOptionType } from '../types';

export const switchSelectedOptions = <Option extends IBaseOptionType>(
  selectedOptions: Option[],
  newSelectedOption: Option,
  getOptionId: (option?: Option) => IdType
): Option[] => {
  const hasInSelectedOptions = selectedOptions.some(option =>
    areOptionsEqual(getOptionId, option, newSelectedOption)
  );

  return hasInSelectedOptions
    ? selectedOptions.filter(
        option => !areOptionsEqual(getOptionId, option, newSelectedOption)
      )
    : [...selectedOptions, newSelectedOption];
};
