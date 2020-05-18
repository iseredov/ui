import {
  ISelectClassNames,
  SelectSize,
  SelectPosition,
} from '../../BaseSelect/types';
import {
  ILoadOptionParams,
  ILoadOptionsData,
} from '../hooks/useSearchLoadData/useSearchLoadData';
import { IGeneralSingleSelectProps } from '../../SingleSelect/types';

export interface ISuggesterProps<Option>
  extends Omit<
    IGeneralSingleSelectProps<Option>,
    | 'mobileName'
    | 'mobileBeforeHeader'
    | 'mobileAfterHeader'
    | 'mobileOptionListHeader'
    | 'mobileOptionListFooter'
    | 'options'
    | 'value'
    | 'onChange'
    | 'getOptionId'
  > {
  value: string;
  loadOptions: (params: ILoadOptionParams) => Promise<ILoadOptionsData<Option>>;
  classNames?: {
    selectInputClassName?: string;
  } & ISelectClassNames;
  dataName?: string;
  maxOptionListWidth?: number;
  minOptionListWidth?: number;
  placeholder?: string;
  size?: SelectSize;
  position?: SelectPosition;
  error?: boolean | string;
  isDisabled?: boolean;
  isInitialOpen?: boolean;
  isClearable?: boolean;
  getOptionName?: (option?: Option) => string;
  onChange: (value: string) => void;
}
