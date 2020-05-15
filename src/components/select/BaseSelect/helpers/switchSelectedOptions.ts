import { IBaseOption } from '..';
import { areOptionsEqual } from './areOptionsEqual';

export const switchSelectedOptions = <Option extends IBaseOption>(
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
