import { areOptionsEqual } from './areOptionsEqual';
import { IBaseOptionType } from '../types';

interface TAddSelectedOptionParams<Option> {
  getOptionId: (option: any) => IdType;
  getOptionName: (option: any) => string;
  selectedOptionData: Partial<Option>;
  options: Option[];
}

export const addSelectedToOptions = <Option extends IBaseOptionType>({
  getOptionId,
  getOptionName,
  selectedOptionData,
  options,
}: TAddSelectedOptionParams<Option>): Option[] => {
  const hasSelectedInOptions = options.find(option =>
    areOptionsEqual(getOptionId, option, selectedOptionData)
  );
  const hasOptionName = !!getOptionName(selectedOptionData);

  if (hasSelectedInOptions || !hasOptionName) {
    return options;
  }

  const result = [selectedOptionData, ...options] as Option[];

  return result;
};
