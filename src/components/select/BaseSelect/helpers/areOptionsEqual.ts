import { IBaseOption } from '../Options/types';

type IGetOptionId<Option extends IBaseOption> = (option?: Option) => IdType;

export const areOptionsEqual = <Option extends IBaseOption>(
  getOptionId: IGetOptionId<Option>,
  currentOption?: Option,
  selectedOption?: Option
) => getOptionId(currentOption) === getOptionId(selectedOption);
